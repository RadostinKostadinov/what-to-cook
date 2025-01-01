import React from "react";
import BottomSheet from "../../BottomSheet";
import TextInputWithMeasurementUnit from "../../TextInputWithMeasurementUnit";
import Button from "../../Button";
import { useAllProducts } from "../../../hooks/Product/useAllProducts.js";
import TextInputAutocomplete from "../../TextInputAutocomplete.jsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { shortenMeasurementUnit } from "../../../utils/dataTransform.js";
import { createPortal } from "react-dom";

const recipeProductSchema = z.object({
  name: z
    .string()
    .min(1, "Това поле е задължително.")
    .max(80, "Максимална дължина - 80 символа."),
  amount: z
    .number({
      errorMap: (issue, ctx) => ({ message: "Въведете валидна стойност" }),
    })
    .min(0),
});

export default function AddRecipeProductBottomSheet({
  setIsOpened,
  setIsCreateProductOpened,
  recipeProducts,
  addRecipeProduct,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(recipeProductSchema),
  });

  const { isLoading, error, data: allProducts } = useAllProducts();

  if (isLoading) return <div className="pt-20 text-center">Loading...</div>;
  if (error)
    return (
      <div className="pt-20 text-center">
        Server Error. Please contact administrator.
      </div>
    );

  const productName = watch("name", "");

  const selectedProduct = allProducts.data.products.find(
    (product) => product.name === productName
  );

  if (selectedProduct)
    selectedProduct.measurementUnit = shortenMeasurementUnit(
      selectedProduct.measurementUnit
    );

  const onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    return handleSubmit(async (data) => {
      addRecipeProduct({ product: selectedProduct, amount: data.amount });
      reset();
    })(event);
  };

  return createPortal(
    <BottomSheet setIsOpened={setIsOpened}>
      <span className="text-app-darkBlue w-full text-center block">
        Продукти в рецептата
      </span>
      <div className="flex flex-col gap-2 mb-12 border rounded-xl border-app-darkBlue p-4 h-[30vh] max-h-[30vh] overflow-auto bg-app-lightBlue40">
        {recipeProducts.map((product) => {
          return (
            <div
              key={product.product.id}
              className="flex justify-between items-center border border-app-darkBlue rounded-3xl py-2 px-4 text-app-lightBlue uppercase font-bold bg-white"
            >
              <span>{product.product.name}</span>
              {product.amount !== 0 && (
                <span>
                  {product.amount}{" "}
                  {shortenMeasurementUnit(product.product.measurementUnit)}.
                </span>
              )}
            </div>
          );
        })}
      </div>
      <form onSubmit={onSubmit}>
        <TextInputAutocomplete
          label="Име на продукт"
          placeholder="Въведете име на продукт"
          value={getValues("name")}
          autocomplete={allProducts.data.products.map(
            (product) => product.name
          )}
          rhfRegister={register("name")}
          setValue={(newValue) => {
            setValue("name", newValue);
          }}
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
          label="Нужно количество"
          placeholder=""
          unit={selectedProduct ? selectedProduct.measurementUnit : ""}
          rhfRegister={register("amount", { valueAsNumber: true })}
        ></TextInputWithMeasurementUnit>
        {errors.amount && (
          <p className="text-center font-montserrat text-app-red">
            {errors.amount.message}
          </p>
        )}
        {errors.alertAmount && (
          <p className="text-center font-montserrat text-app-red">
            {errors.alertAmount.message}
          </p>
        )}
        <p className="font-montserrat italic text-right text-sm text-app-darkBlue">
          0 - без стойност
        </p>
        <div className="flex flex-col w-full items-center justify-center gap-8 mt-8">
          <Button
            disabled={isSubmitting}
            type="submit"
            className="bg-gradient-to-t from-app-darkBlue to-app-lightBlue p-2"
            btnText={isSubmitting ? "Добавяне..." : "Добави"}
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
