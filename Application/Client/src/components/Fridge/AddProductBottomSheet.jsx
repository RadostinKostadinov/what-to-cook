import React from "react";
import BottomSheet from "../BottomSheet";
import TextInputWithMeasurementUnit from "../TextInputWithMeasurementUnit";
import Button from "../Button";
import { useAllProducts } from "../../hooks/Product/useAllProducts.js";
import TextInputAutocomplete from "../TextInputAutocomplete.jsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { shortenMeasurementUnit } from "../../utils/dataTransform.js";
import HttpService from "../../services/http/HttpService.js";
import { useQueryClient } from "@tanstack/react-query";

const fridgeProductSchema = z.object({
  name: z
    .string()
    .min(1, "Това поле е задължително.")
    .max(80, "Максимална дължина - 80 символа."),
  amount: z
    .number({
      errorMap: (issue, ctx) => ({ message: "Въведете валидна стойност" }),
    })
    .min(0.001, "Минимално количество 0.001"),
  alertAmount: z
    .number({
      errorMap: (issue, ctx) => ({ message: "Въведете валидна стойност" }),
    })
    .min(0, "Минимално количество 0.001"),
});

export default function AddProductBottomSheet({
  setIsOpened,
  setIsCreateProductOpened,
}) {
  const queryClient = useQueryClient();
  const api = HttpService.getInstance();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
    getValues,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(fridgeProductSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await api.User.addProductToFridge({
        name: data.name,
        amount: data.amount,
        alertAmount: data.alertAmount,
      });
      queryClient.invalidateQueries({
        queryKey: ["currentUser", "Fridge"],
        exact: true,
      });

      reset();
    } catch (err) {
      setError("root", {
        message: "Проблем при създаването",
      });
    }
  };

  const productName = watch("name", "");

  const { isLoading, error, data: allProducts } = useAllProducts();

  if (isLoading) return <div className="pt-20 text-center">Loading...</div>;
  if (error)
    return (
      <div className="pt-20 text-center">
        Server Error. Please contact administrator.
      </div>
    );

  const selectedProduct = allProducts.data.products.find(
    (product) => product.name === productName
  );

  if (selectedProduct)
    selectedProduct.measurementUnit = shortenMeasurementUnit(
      selectedProduct.measurementUnit
    );
  return (
    <BottomSheet setIsOpened={setIsOpened}>
      <form
        onSubmit={handleSubmit(onSubmit, (errors) => {
          console.log(errors);
        })}
      >
        <TextInputAutocomplete
          label="Име на продукт"
          placeholder="Въведете име на продукт"
          value={getValues("name")}
          setValue={(newValue) => {
            setValue("name", newValue);
          }}
          autocomplete={allProducts.data.products.map(
            (product) => product.name
          )}
          rhfRegister={register("name")}
        ></TextInputAutocomplete>
        {errors.name && (
          <p className="text-center font-montserrat text-app-red">
            {errors.name.message}
          </p>
        )}
        <p className="font-montserrat italic text-center text-sm text-app-darkBlue mt-2">
          Ако не откривате даден продукт, може<br></br>да го добавите към
          списъка от{" "}
          <button
            className="italic underline text-app-lightBlue"
            onClick={(e) => {
              setIsOpened(false);
              setIsCreateProductOpened(true);
            }}
          >
            тук.
          </button>
        </p>
        <TextInputWithMeasurementUnit
          type="text"
          className="mt-8"
          label="Добави към хладилника"
          placeholder=""
          unit={selectedProduct ? selectedProduct.measurementUnit : ""}
          rhfRegister={register("amount", { valueAsNumber: true })}
        ></TextInputWithMeasurementUnit>
        {errors.amount && (
          <p className="text-center font-montserrat text-app-red">
            {errors.amount.message}
          </p>
        )}
        <TextInputWithMeasurementUnit
          type="text"
          className="mt-4"
          label="На свършване, при по-малко от"
          placeholder=""
          unit={selectedProduct ? selectedProduct.measurementUnit : ""}
          rhfRegister={register("alertAmount", { valueAsNumber: true })}
        ></TextInputWithMeasurementUnit>
        {errors.alertAmount && (
          <p className="text-center font-montserrat text-app-red">
            {errors.alertAmount.message}
          </p>
        )}
        <p className="font-montserrat italic text-right text-sm text-app-darkBlue">
          0 - без уведомление
        </p>
        <div className="flex flex-col w-full items-center justify-center gap-8 mt-8">
          {errors.root && (
            <p className="text-center font-montserrat text-app-red">
              {errors.root.message}
            </p>
          )}
          {isSubmitSuccessful && (
            <p className="text-center font-montserrat text-app-lightBlue">
              Успешно добавихте продукт
            </p>
          )}
          <Button
            disabled={isSubmitting}
            type="submit"
            className="bg-gradient-to-t from-app-darkBlue to-app-lightBlue p-2"
            btnText={isSubmitting ? "Добавяне..." : "Запази"}
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
