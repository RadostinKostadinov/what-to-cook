import React from "react";
import BottomSheet from "../BottomSheet";
import TextInput from "../TextInput";
import Button from "../Button";
import Select from "../Select";
import HttpService from "../../services/http/HttpService";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { createPortal } from "react-dom";
import { measurementUnitMappings } from "../../constants";

const productSchema = z.object({
  name: z
    .string()
    .min(1, "Това поле е задължително.")
    .max(80, "Максимална дължина - 80 символа."),
  measurementUnit: z.enum(Object.keys(measurementUnitMappings), {
    errorMap: (issue, ctx) => ({ message: "Моля, изберете мерна единица." }),
  }),
});

export default function CreateProductBottomSheet({ setIsOpened }) {
  const queryClient = useQueryClient();
  const api = HttpService.getInstance();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = async (data) => {
    try {
      await api.Product.sendCreateProductRequest({
        name: data.name,
        measurementUnit: data.measurementUnit,
      });

      queryClient.invalidateQueries({
        queryKey: ["allProducts"],
        exact: true,
      });

      reset();
    } catch (err) {
      if (err.message === "Product already exists") {
        return setError("root", {
          message: "Продукта вече съществува",
        });
      }
      setError("root", {
        message: "Проблем при създаването",
      });
    }
  };

  return createPortal(
    <BottomSheet setIsOpened={setIsOpened}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Име на продукт"
          placeholder="Въведете име на продукт"
          rhfRegister={register("name")}
        ></TextInput>
        {errors.name && (
          <p className="text-center font-montserrat text-app-red">
            {errors.name.message}
          </p>
        )}
        <Select
          label="Мерна единица"
          id="create-product-measurement-unit"
          name="product-measurement-unit"
          values={Object.keys(measurementUnitMappings)}
          placeholder="Изберете"
          rhfRegister={register("measurementUnit")}
          className="mt-4"
        ></Select>
        {errors.measurementUnit && (
          <p className="text-center font-montserrat text-app-red">
            {errors.measurementUnit.message}
          </p>
        )}
        <div className="flex flex-col w-full items-center justify-center gap-8 mt-8">
          {errors.root && (
            <p className="text-center font-montserrat text-app-red">
              {errors.root.message}
            </p>
          )}
          {isSubmitSuccessful && (
            <p className="text-center font-montserrat text-app-lightBlue">
              Успешно създадохте продукт
            </p>
          )}
          <Button
            disabled={isSubmitting}
            type="submit"
            className="bg-gradient-to-t from-app-darkBlue to-app-lightBlue p-2"
            btnText={isSubmitting ? "Създаване..." : "Създай"}
          ></Button>
          <Button
            className="bg-gradient-to-t from-app-yellow to-app-yellow p-2"
            btnText="Отказ"
            clickEvent={(e) => {
              setIsOpened(false);
            }}
          ></Button>
        </div>
      </form>
    </BottomSheet>,
    document.body
  );
}
