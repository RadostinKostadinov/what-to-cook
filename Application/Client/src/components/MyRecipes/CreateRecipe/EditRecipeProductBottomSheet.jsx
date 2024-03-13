import React from "react";
import BottomSheet from "../../BottomSheet";
import TextInputWithMeasurementUnit from "../../TextInputWithMeasurementUnit";
import Button from "../../Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createPortal } from "react-dom";

const recipeProductSchema = z.object({
  amount: z
    .number({
      errorMap: (issue, ctx) => ({ message: "Въведете валидна стойност" }),
    })
    .min(0),
});

export default function EditRecipeProductBottomSheet({
  setIsOpened,
  productToEdit,
  updateRecipeProduct,
  removeRecipeProduct,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm({
    values: {
      amount: productToEdit.amount,
    },
    resolver: zodResolver(recipeProductSchema),
  });

  const onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    return handleSubmit((data) => {
      updateRecipeProduct({ ...productToEdit, amount: data.amount });
      reset();
    })(event);
  };

  return createPortal(
    <BottomSheet setIsOpened={setIsOpened}>
      <form onSubmit={onSubmit}>
        <p className="text-center text-xl bg-clip-text bg-gradient-to-b from-app-lightBlue to-app-lightBlue uppercase font-bold italic text-transparent font-montserrat">
          {productToEdit.product.name}
        </p>
        <TextInputWithMeasurementUnit
          type="text"
          className="mt-8"
          label="Нужно количество"
          unit={productToEdit.product.measurementUnit}
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
          {isSubmitSuccessful && (
            <p className="text-center font-montserrat text-app-lightBlue">
              Успешно запазено
            </p>
          )}
          <div className="w-full flex gap-12">
            <Button
              className="bg-gradient-to-t from-app-yellow to-app-yellow p-2"
              btnText="Отказ"
              clickEvent={(e) => {
                setIsOpened(false);
              }}
            ></Button>
            <Button
              disabled={isSubmitting}
              className="bg-gradient-to-t from-app-red to-app-red p-2"
              btnText="Премахни"
              clickEvent={async (e) => {
                removeRecipeProduct(productToEdit);
                setIsOpened(false);
              }}
            ></Button>
          </div>
          <div className="w-full flex items-center justify-center">
            <Button
              disabled={isSubmitting}
              type="submit"
              className="bg-gradient-to-t from-app-darkBlue to-app-lightBlue p-2"
              btnText={isSubmitting ? "Запазване..." : "Запази"}
            ></Button>
          </div>
        </div>
      </form>
    </BottomSheet>,
    document.body
  );
}
