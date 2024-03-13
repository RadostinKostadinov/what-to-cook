import React, { useState } from "react";
import { useCurrentUserFridge } from "../../hooks/User/useCurrentUserFridge";
import Title from "../../components/Title";
import ProductInFridge from "../../components/Fridge/ProductInFridge";
import EditProductBottomSheet from "../../components/Fridge/EditProductBottomSheet";

export default function LowAmount() {
  const { isLoading, error, data: fridge } = useCurrentUserFridge();
  const [isEditProductOpened, setIsEditProductOpened] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  let lowAmountProductsCount = 0;

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
        <Title text="На свършване"></Title>
      </h1>
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
        {fridge.data.products.map((product, i) => {
          if (product.alertAmount >= product.amount) {
            lowAmountProductsCount++;
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

          if (
            fridge.data.products.length - 1 === i &&
            lowAmountProductsCount === 0
          ) {
            return (
              <h1 className="text-app-darkBlue text-xl text-center">
                Нямате продукти, които да са на свършване.
              </h1>
            );
          }

          return null;
        })}
      </div>
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
