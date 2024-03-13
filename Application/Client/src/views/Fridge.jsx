import React, { useState } from "react";
import { useCurrentUserFridge } from "../hooks/User/useCurrentUserFridge";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import Title from "../components/Title";
import AddProductBottomSheet from "../components/Fridge/AddProductBottomSheet";
import CreateProductBottomSheet from "../components/Fridge/CreateProductBottomSheet";
import ProductInFridge from "../components/Fridge/ProductInFridge";
import { useForm } from "react-hook-form";
import EditProductBottomSheet from "../components/Fridge/EditProductBottomSheet";
import { Link } from "react-router-dom";

export default function Fridge() {
  const { isLoading, error, data: fridge } = useCurrentUserFridge();
  const [productToSearchFor, setProductToSearchFor] = useState("");
  const [isAddProductOpened, setIsAddProductOpened] = useState(false);
  const [isCreateProductOpened, setIsCreateProductOpened] = useState(false);
  const [isEditProductOpened, setIsEditProductOpened] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const { register, watch } = useForm();

  const watchProductFilter = watch("product-filter", "");

  const DisplayedButtons = [
    {
      type: "Link",
      linkTo: "low-amount",
      buttonText: "На свършване",
    },
    {
      type: "Link",
      linkTo: "history",
      buttonText: "История",
    },
    {
      type: "Button",
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
          if (info.type === "Button") {
            return (
              <Button
                key={info.buttonText}
                btnText={info.buttonText}
                clickEvent={info.action}
              ></Button>
            );
          } else if (info.type === "Link") {
            return (
              <Link
                className="button-orange w-8/12"
                to={info.linkTo}
                key={info.buttonText}
              >
                {info.buttonText}
              </Link>
            );
          }
          return "";
        })}
      </div>
      <div className="w-10/12 mx-auto pt-10">
        <TextInput
          label="Търси"
          placeholder="Въведете име на продукт"
          rhfRegister={register("product-filter")}
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
      <div className="w-11/12 mx-auto pt-10 flex flex-col gap-4 mb-10">
        {fridge.data.products.map((product) => {
          if (
            productToSearchFor === undefined ||
            product.product.name
              .toLowerCase()
              .includes(watchProductFilter.toLowerCase())
          ) {
            return (
              <ProductInFridge
                product={product}
                key={product.product.name}
                selectProduct={(e) => {
                  setProductToEdit(product);
                  setIsEditProductOpened(true);
                }}
              ></ProductInFridge>
            );
          }
        })}
      </div>
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
      {isEditProductOpened ? (
        <EditProductBottomSheet
          setIsOpened={setIsEditProductOpened}
          productToEdit={productToEdit}
        ></EditProductBottomSheet>
      ) : (
        ""
      )}
    </div>
  );
}
