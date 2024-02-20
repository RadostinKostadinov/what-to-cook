import React, { useState } from "react";
import { useCurrentUserFridge } from "../hooks/User/useCurrentUserFridge";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import Title from "../components/Title";
import BottomSheet from "../components/BottomSheet";
import TextInputWithMeasurementUnit from "../components/TextInputWithMeasurementUnit";
import AddProductBottomSheet from "../components/Fridge/AddProductBottomSheet";
import CreateProductBottomSheet from "../components/Fridge/CreateProductBottomSheet";

export default function Fridge() {
  const { isLoading, error, data: fridge } = useCurrentUserFridge();
  const [productToSearchFor, setProductToSearchFor] = useState("");
  const [isAddProductOpened, setIsAddProductOpened] = useState(false);
  const [isCreateProductOpened, setIsCreateProductOpened] = useState(false);

  const DisplayedButtons = [
    {
      buttonText: "На свършване",
    },
    {
      buttonText: "История",
    },
    {
      buttonText: "Добави",
      action: () => {
        setIsAddProductOpened(true);
      },
    },
  ];

  if (isLoading) return <div className="pt-20 text-center">Loading...</div>;
  if (error)
    return (
      <div className="pt-20 text-center">
        Server Error. Please contact administrator.
      </div>
    );

  return (
    <div className="pt-20">
      <h1 className="text-center text-xl py-8">
        <Title text="Хладилник"></Title>
      </h1>
      <div className="flex flex-col items-center gap-8">
        {DisplayedButtons.map((info) => {
          return (
            <Button
              key={info.buttonText}
              btnText={info.buttonText}
              clickEvent={info.action}
            ></Button>
          );
        })}
      </div>
      <div className="w-10/12 mx-auto pt-10">
        <TextInput
          label="Търси"
          placeholder="Въведете име на продукт"
          value={productToSearchFor}
          onChange={(e) => {
            setProductToSearchFor(e.target.value);
          }}
        ></TextInput>
      </div>
      <div className="w-11/12 mx-auto pt-10">
        <p className="text-center text-xl bg-clip-text bg-gradient-to-b from-app-darkBlue to-app-lightBlue uppercase font-bold italic text-transparent font-montserrat">
          Вашите продукти
        </p>
        <hr className="bg-app-darkBlue my-1"></hr>
        <p className="font-montserrat italic text-center text-base text-app-darkBlue">
          Натиснете върху продукт, <br></br> за да го редактирате или премахнете
        </p>
      </div>
      <div className="w-11/12 mx-auto pt-10"></div>
      {isAddProductOpened ? (
        <AddProductBottomSheet
          setIsOpened={setIsAddProductOpened}
          setIsCreateProductOpened={setIsCreateProductOpened}
        ></AddProductBottomSheet>
      ) : (
        ""
      )}
      {isCreateProductOpened ? (
        <CreateProductBottomSheet
          setIsOpened={setIsCreateProductOpened}
        ></CreateProductBottomSheet>
      ) : (
        ""
      )}
    </div>
  );
}
