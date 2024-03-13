import React, { useState } from "react";
import BottomSheet from "../BottomSheet";
import { z } from "zod";
import HttpService from "../../services/http/HttpService.js";
import TextInput from "../TextInput.jsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInputWithMeasurementUnit from "../TextInputWithMeasurementUnit.jsx";
import { shortenMeasurementUnit } from "../../utils/dataTransform.js";
import Button from "../Button.jsx";
import { useQueryClient } from "@tanstack/react-query";
import ConfirmationPopup from "../ConfimationPopup.jsx";

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

export default function EditProductBottomSheet({ setIsOpened, productToEdit }) {
  const api = HttpService.getInstance();
  const queryClient = useQueryClient();
  const [isRemoveProductPopupOpen, setIsRemoveProductPopupOpen] =
    useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setError,
  } = useForm({
    values: {
      name: productToEdit.product.name,
      amount: productToEdit.amount,
      alertAmount: productToEdit.alertAmount,
    },
    resolver: zodResolver(fridgeProductSchema),
  });

  const onSubmit = async (data) => {
    try {
      await api.User.updateProductInFridge({
        name: data.name,
        amount: data.amount,
        alertAmount: data.alertAmount,
      });
      queryClient.invalidateQueries({
        queryKey: ["currentUser", "Fridge"],
        exact: true,
      });
    } catch (err) {
      setError("root", {
        message: "Проблем при обновяването.",
      });
    }
  };

  return (
    <BottomSheet setIsOpened={setIsOpened}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="text-center text-xl bg-clip-text bg-gradient-to-b from-app-lightBlue to-app-lightBlue uppercase font-bold italic text-transparent font-montserrat">
          {productToEdit.product.name}
        </p>
        <TextInputWithMeasurementUnit
          type="text"
          className="mt-8"
          label="Налично количество"
          unit={shortenMeasurementUnit(productToEdit.product.measurementUnit)}
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
          unit={shortenMeasurementUnit(productToEdit.product.measurementUnit)}
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
              Успешно обновихте продукта
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
                setIsRemoveProductPopupOpen(true);
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
      {isRemoveProductPopupOpen && (
        <ConfirmationPopup
          title="Премахване на продукт"
          text={`Сигурни ли сте, че искате да премахнете продукта "${productToEdit.product.name}" от вашият хладилник?`}
          onConfirm={async () => {
            await api.User.removeProductFromFridge({
              name: productToEdit.product.name,
            });
            queryClient.invalidateQueries({
              queryKey: ["currentUser", "Fridge"],
              exact: true,
            });
            setIsRemoveProductPopupOpen(false);
            setIsOpened(false);
          }}
          onCancel={() => {
            setIsRemoveProductPopupOpen(false);
          }}
        ></ConfirmationPopup>
      )}
    </BottomSheet>
  );
}
