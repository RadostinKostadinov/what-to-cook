import { useForm } from "react-hook-form";
import TextInput from "../../components/TextInput";
import TextInputWithMeasurementUnit from "../../components/TextInputWithMeasurementUnit";
import Title from "../../components/Title";
import { useState } from "react";
import ProductsInRecipe from "../../components/Recipes/CreateRecipe/ProductsInRecipe";
import TextArea from "../../components/TextArea";
import ImageInput from "../../components/ImageInput";
import TextInputAutocomplete from "../../components/TextInputAutocomplete";
import Button from "../../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import HttpService from "../../services/http/HttpService";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { recipeCategories, recipeGroups } from "../../constants";
import { useQueryClient } from "@tanstack/react-query";

const recipeSchema = z
  .object({
    name: z
      .string()
      .min(1, "Това поле е задължително.")
      .max(80, "Максимална дължина - 80 символа."),
    preparationTime: z
      .number({
        errorMap: (issue, ctx) => ({ message: "Въведете валидна стойност" }),
      })
      .min(0),
    cookingTime: z
      .number({
        errorMap: (issue, ctx) => ({ message: "Въведете валидна стойност" }),
      })
      .min(0),
    totalTime: z
      .number({
        errorMap: (issue, ctx) => ({ message: "Въведете валидна стойност" }),
      })
      .min(0),
    portions: z
      .number({
        errorMap: (issue, ctx) => ({ message: "Въведете валидна стойност" }),
      })
      .min(0),
    description: z.string().min(1, "Това поле е задължително."),
    image: z.custom(),
    category: z.enum(recipeCategories, {
      errorMap: (issue, ctx) => ({
        message: "Моля, изберете валидна стойност",
      }),
    }),
    group: z.enum(recipeGroups, {
      errorMap: (issue, ctx) => ({
        message: "Моля, изберете валидна стойност",
      }),
    }),
    isNew: z.boolean().default(true),
  })
  .refine(
    (data) => {
      if (data.isNew) {
        return data.image.length !== 0;
      }
      return true;
    },
    { path: ["image"], message: "Моля, добавете снимка" }
  )
  .refine(
    (data) => {
      if (data.isNew) {
        return data.image.size < 5000000;
      }
      return true;
    },
    { path: ["image"], message: "Размерът на файла е по-голям от 5MB" }
  );

export default function RecipeForm() {
  const queryClient = useQueryClient();
  const api = HttpService.getInstance();
  const location = useLocation();
  const recipe = location.state || null;

  const {
    register,
    getValues,
    setValue,
    formState: { isSubmitting, isSubmitSuccessful, errors, submitCount },
    handleSubmit,
    setError,
  } = useForm({
    values: recipe
      ? {
          isNew: false,
          name: recipe.name,
          preparationTime: recipe.preparationTime,
          cookingTime: recipe.cookingTime,
          totalTime: recipe.totalTime,
          portions: recipe.portions,
          description: recipe.description,
          category: recipe.category,
          group: recipe.group,
        }
      : {},
    resolver: zodResolver(recipeSchema),
  });
  const [recipeProducts, setRecipeProducts] = useState(
    recipe ? recipe.products : []
  );
  const [isProductsArrEmpty, setIsProductsArrEmpty] = useState(
    recipe ? false : true
  );
  const navigate = useNavigate();

  async function deleteRecipe() {
    try {
      await api.Recipe.deleteUserRecipe(recipe.id);
      navigate(-1);
    } catch (err) {
      throw err;
    }
  }

  async function saveRecipe(data) {
    const formData = new FormData();

    if (recipeProducts.length === 0) {
      setError("products", { message: "" });
      return;
    }

    const dataToSend = {
      ...data,
      products: recipeProducts.map((product) => {
        return { product: product.product.id, amount: product.amount };
      }),
    };
    delete dataToSend.isNew;
    delete dataToSend.image;

    // If image uploaded
    if (data.image.name) {
      formData.append("image", data.image);
    }

    // If editing a recipe
    if (recipe) {
      dataToSend.image = recipe.image;
      formData.append("recipeId", recipe.id);
    }

    formData.append("recipe", JSON.stringify(dataToSend));

    try {
      await api.Recipe.addUserRecipe(formData);
      queryClient.invalidateQueries({
        queryKey: ["currentUserRecipes"],
        exact: true,
      });
    } catch (err) {
      throw err;
    }
  }

  return (
    <div className="pt-20">
      <h1 className="text-center text-xl py-8">
        <Title text="Редактиране на рецепта"></Title>
      </h1>
      <form onSubmit={handleSubmit(saveRecipe)}>
        <div className="w-11/12 mx-auto flex flex-col gap-4 mb-10">
          <TextInput
            label="Име"
            placeholder="Име на рецептата"
            rhfRegister={register("name")}
          ></TextInput>
          {errors.name && (
            <p className="text-center font-montserrat text-app-red">
              {errors.name.message}
            </p>
          )}
          <TextInputWithMeasurementUnit
            label="Време за приготвяне"
            placeholder="0"
            unit="мин."
            type="number"
            rhfRegister={register("preparationTime", { valueAsNumber: true })}
          ></TextInputWithMeasurementUnit>
          {errors.preparationTime && (
            <p className="text-center font-montserrat text-app-red">
              {errors.preparationTime.message}
            </p>
          )}
          <TextInputWithMeasurementUnit
            label="Време за готвене"
            placeholder="0"
            unit="мин."
            type="number"
            rhfRegister={register("cookingTime", { valueAsNumber: true })}
          ></TextInputWithMeasurementUnit>
          {errors.cookingTime && (
            <p className="text-center font-montserrat text-app-red">
              {errors.cookingTime.message}
            </p>
          )}
          <TextInputWithMeasurementUnit
            label="Общо време"
            placeholder="0"
            unit="мин."
            type="number"
            rhfRegister={register("totalTime", { valueAsNumber: true })}
          ></TextInputWithMeasurementUnit>
          {errors.totalTime && (
            <p className="text-center font-montserrat text-app-red">
              {errors.totalTime.message}
            </p>
          )}
          <TextInputWithMeasurementUnit
            label="Порции"
            placeholder="0"
            unit="бр."
            type="number"
            rhfRegister={register("portions", { valueAsNumber: true })}
          ></TextInputWithMeasurementUnit>
          {errors.portions && (
            <p className="text-center font-montserrat text-app-red">
              {errors.portions.message}
            </p>
          )}
          <ProductsInRecipe
            recipeProducts={recipeProducts}
            addRecipeProduct={(product) => {
              const found = recipeProducts.find(
                (productIn) => productIn.product.id === product.product.id
              );
              if (found) {
                found.amount += product.amount;
                setRecipeProducts([...recipeProducts]);
              } else {
                setRecipeProducts([...recipeProducts, product]);
              }
              setIsProductsArrEmpty(false);
            }}
            updateRecipeProduct={(product) => {
              const found = recipeProducts.find(
                (productIn) => productIn.product.id === product.product.id
              );
              if (found) {
                found.amount = product.amount;
                setRecipeProducts([...recipeProducts]);
              }
            }}
            removeRecipeProduct={(product) => {
              const filteredProducts = recipeProducts.filter(
                (productIn) => productIn.product.id !== product.product.id
              );
              setRecipeProducts([...filteredProducts]);
              if (filteredProducts.length === 0) {
                setIsProductsArrEmpty(true);
              }
            }}
          ></ProductsInRecipe>
          {isProductsArrEmpty && !!submitCount && (
            <p className="text-center font-montserrat text-app-red">
              Моля, добавете поне един продукт
            </p>
          )}
          <TextArea
            label="Начин на приготвяне"
            placeholder="Опишете как се приготвя ястието"
            rhfRegister={register("description")}
          ></TextArea>
          {errors.description && (
            <p className="text-center font-montserrat text-app-red">
              {errors.description.message}
            </p>
          )}
          <ImageInput
            label="Изображение"
            placeholder="Добавете снимка"
            rhfRegister={register("image")}
            setValue={(file) => setValue("image", file)}
            imageUrl={
              recipe && typeof recipe.image === "string"
                ? "http://192.168.7.3:8810/api/images/" + recipe.image
                : null
            }
          ></ImageInput>
          {errors.image && (
            <p className="text-center font-montserrat text-app-red">
              {errors.image.message}
            </p>
          )}
          <TextInputAutocomplete
            className="z-10"
            label="Категория"
            value={getValues("category")}
            autocomplete={recipeCategories}
            rhfRegister={register("category")}
            setValue={(newValue) => {
              setValue("category", newValue);
            }}
          ></TextInputAutocomplete>
          {errors.category && (
            <p className="text-center font-montserrat text-app-red">
              {errors.category.message}
            </p>
          )}
          <TextInputAutocomplete
            className="z-0"
            label="Група"
            value={getValues("group")}
            autocomplete={recipeGroups}
            rhfRegister={register("group")}
            setValue={(newValue) => {
              setValue("group", newValue);
            }}
          ></TextInputAutocomplete>
          {errors.group && (
            <p className="text-center font-montserrat text-app-red">
              {errors.group.message}
            </p>
          )}
        </div>
        <div className="flex flex-col w-full items-center justify-center gap-8 mt-8 mb-12">
          {Object.keys(errors).length > 0 ? console.log(errors) : ""}
          {isSubmitSuccessful && (
            <p className="text-center font-montserrat text-app-lightBlue">
              Успешно добавихте рецептата
            </p>
          )}
          {Object.keys(errors).length > 0 ? (
            <p className="text-center font-montserrat text-app-red">
              Моля, проверете всички полета
            </p>
          ) : (
            ""
          )}
          <Button
            disabled={isSubmitting}
            type="submit"
            className="bg-gradient-to-t from-app-darkBlue to-app-lightBlue p-2"
            btnText={isSubmitting ? "Запазване..." : "Запази"}
          ></Button>
          <Button
            className="bg-gradient-to-t from-app-yellow to-app-yellow p-2"
            btnText="Отказ"
            clickEvent={(e) => {
              navigate(-1);
            }}
          ></Button>
          {recipe && (
            <Button
              disabled={isSubmitting}
              className="bg-gradient-to-t from-app-red to-app-red p-2"
              btnText="Премахни"
              clickEvent={async (e) => {
                deleteRecipe();
              }}
            ></Button>
          )}
        </div>
      </form>
    </div>
  );
}
