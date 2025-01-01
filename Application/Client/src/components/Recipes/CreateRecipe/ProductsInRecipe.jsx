import { useState } from "react";
import Button from "../../Button";
import AddRecipeProductBottomSheet from "./AddRecipeProductBottomSheet";
import CreateProductBottomSheet from "../../Fridge/CreateProductBottomSheet";
import { shortenMeasurementUnit } from "../../../utils/dataTransform";
import EditRecipeProductBottomSheet from "./EditRecipeProductBottomSheet";

export default function ProductsInRecipe({
  recipeProducts,
  addRecipeProduct,
  updateRecipeProduct,
  removeRecipeProduct,
}) {
  const [isAddProductOpened, setIsAddProductOpened] = useState(false);
  const [isEditProductOpened, setIsEditProductOpened] = useState(false);
  const [isCreateProductOpened, setIsCreateProductOpened] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  return (
    <div>
      <div className="flex flex-col items-center justify-center font-montserrat w-full">
        <label className="text-app-darkBlue">Необходими продукти</label>
        <hr className="bg-app-darkBlue my-1 w-full"></hr>
        <p className="font-montserrat italic text-center text-base text-app-darkBlue">
          Натиснете върху продукт, <br></br> за да го редактирате или премахнете
        </p>
        <div className="flex flex-col w-full gap-2 mb-4 mt-4">
          {recipeProducts.map((product) => {
            return (
              <div
                key={product.product.id}
                className="flex justify-between items-center border border-app-darkBlue rounded-3xl py-2 px-4 text-app-lightBlue uppercase font-bold bg-white"
                onClick={(e) => {
                  setProductToEdit(product);
                  setIsEditProductOpened(true);
                }}
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
        <Button
          btnText="Добави продукт"
          clickEvent={(e) => {
            e.preventDefault();
            setIsAddProductOpened(true);
          }}
        ></Button>
      </div>
      {isAddProductOpened && (
        <AddRecipeProductBottomSheet
          setIsOpened={setIsAddProductOpened}
          setIsCreateProductOpened={setIsCreateProductOpened}
          recipeProducts={recipeProducts}
          addRecipeProduct={addRecipeProduct}
        ></AddRecipeProductBottomSheet>
      )}
      {isEditProductOpened && (
        <EditRecipeProductBottomSheet
          setIsOpened={setIsEditProductOpened}
          productToEdit={productToEdit}
          addRecipeProduct={addRecipeProduct}
          updateRecipeProduct={updateRecipeProduct}
          removeRecipeProduct={removeRecipeProduct}
        ></EditRecipeProductBottomSheet>
      )}
      {isCreateProductOpened && (
        <CreateProductBottomSheet
          setIsOpened={setIsCreateProductOpened}
        ></CreateProductBottomSheet>
      )}
    </div>
  );
}
