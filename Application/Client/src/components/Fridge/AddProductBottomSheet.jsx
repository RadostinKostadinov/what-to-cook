import React, { useState } from "react";
import BottomSheet from "../BottomSheet";
import TextInput from "../TextInput";
import TextInputWithMeasurementUnit from "../TextInputWithMeasurementUnit";
import Button from "../Button";

export default function AddProductBottomSheet({
  setIsOpened,
  setIsCreateProductOpened,
}) {
  const [productToSearchFor, setProductToSearchFor] = useState("");
  const [productAmount, setProductAmount] = useState("");
  const [alertAmount, setAlertAmount] = useState("");

  return (
    <BottomSheet setIsOpened={setIsOpened}>
      <TextInput
        label="Продукт"
        placeholder="Въведете име на продукт"
        value={productToSearchFor}
        onChange={(e) => {
          setProductToSearchFor(e.target.value);
        }}
      ></TextInput>
      <p className="font-montserrat italic text-center text-sm text-app-darkBlue mt-2">
        Ако не откривате даден продукт, може<br></br>да го добавите към списъка
        от{" "}
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
        className="mt-8"
        label="Наличност"
        placeholder=""
        value={productAmount}
        setValue={setProductAmount}
        unit={"кг"}
      ></TextInputWithMeasurementUnit>
      <TextInputWithMeasurementUnit
        className="mt-4"
        label="На свършване, при по-малко от"
        placeholder=""
        value={alertAmount}
        setValue={setAlertAmount}
        unit={"кг"}
      ></TextInputWithMeasurementUnit>
      <p className="font-montserrat italic text-right text-sm text-app-darkBlue">
        0 - без уведомление
      </p>
      <div className="flex flex-col w-full items-center justify-center gap-8 mt-8">
        <Button
          className="bg-gradient-to-t from-app-darkBlue to-app-lightBlue p-2"
          btnText="Запази"
          clickEvent={(e) => {
            alert("SEND SAVE REQUEST...");
          }}
        ></Button>
        <Button
          className="bg-gradient-to-t from-app-yellow to-app-yellow p-2"
          btnText="Отказ"
          clickEvent={(e) => {
            setIsOpened(false);
          }}
        ></Button>
      </div>
    </BottomSheet>
  );
}
