import React, { useState } from "react";
import BottomSheet from "../BottomSheet";
import TextInput from "../TextInput";
import Button from "../Button";
import Select from "../Select";
import HttpService from "../../services/http/HttpService";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const productSchema = z.object({
  name: z
    .string()
    .min(1, "Това поле е задължително.")
    .max(80, "Максимална дължина - 80 символа."),
  measurementUnit: z.enum(["килограм", "литър"], {
    errorMap: (issue, ctx) => ({ message: "Моля, изберете мерна единица." }),
  }),
});

export default function CreateProductBottomSheet({ setIsOpened }) {
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
      const res = await api.Product.sendCreateProductRequest({
        name: data.name,
        measurementUnit: data.measurementUnit,
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

  return (
    <BottomSheet setIsOpened={setIsOpened}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Име на продукт"
          placeholder="Въведете име на продукт"
          rhfRegister={register("name")}
          errorMessage={errors.name ? errors.name.message : ""}
        ></TextInput>
        <Select
          label="Мерна единица"
          id="create-product-measurement-unit"
          name="product-measurement-unit"
          values={["килограм", "литър"]}
          placeholder="Изберете"
          rhfRegister={register("measurementUnit")}
          errorMessage={
            errors.measurementUnit ? errors.measurementUnit.message : ""
          }
          className="mt-4"
        ></Select>
        <div className="flex flex-col w-full items-center justify-center gap-8 mt-8">
          {!errors.root && !isSubmitSuccessful && (
            <p className="opacity-0">.</p>
          )}
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
    </BottomSheet>
  );
}
