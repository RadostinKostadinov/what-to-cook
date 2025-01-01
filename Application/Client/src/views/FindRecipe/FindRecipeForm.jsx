import { useForm } from "react-hook-form";
import Checkbox from "../../components/Checkbox";
import Select from "../../components/Select";
import { recipeCategories, recipeGroups } from "../../constants";
import Button from "../../components/Button";
import HttpService from "../../services/http/HttpService";
import React from "react";

export default function FindRecipeForm({setRecipes}) {
  const api = HttpService.getInstance();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setError
  } = useForm();

  const onSubmit = async (data) => {
    setRecipes([]);
    const sources = [
      data['include-my-recipes'] && 'лични',
      data['include-friends-recipes'] && 'приятели',
      data['include-public-recipes'] && 'публични',
    ].filter(Boolean);

    const categories = data['recipeCategory'] ? [data['recipeCategory']] : [];
    const groups = data['recipeGroups'] ? [data['recipeGroups']] : [];
    try {
      const res = await api.Recipe.findRecipes({
        sources,
        categories,
        groups,
      });

      setRecipes(res.data.recipes);
    } catch (err) {
      setError("root", {
        message: "Възникна проблем, моля опитайте по-късно.",
      });
    }
  };

  return (
      <form
          onSubmit={handleSubmit(onSubmit, (errors) => {
            console.log(errors);
          })}
          className="flex flex-col items-center justify-center w-full gap-4"
      >
        <div className="flex flex-col items-center justify-center font-montserrat w-full gap-2">
          <p className="text-app-darkBlue">
            Маркирайте списъци с рецепти, сред които да търсим
          </p>
          <Checkbox
              id="include-my-recipes"
              label="Моите рецепти"
              rhfRegister={register("include-my-recipes")}
          />
          <Checkbox
              id="include-friends-recipes"
              label="Рецепти на приятели"
              rhfRegister={register("include-friends-recipes")}
          />
          <Checkbox
              id="include-public-recipes"
              label="Общи рецепти"
              rhfRegister={register("include-public-recipes")}
          />
        </div>
        <div className="flex flex-col items-center justify-center font-montserrat w-full">
          <Select
              label="Изберете вида на ястието"
              id="recipe-category"
              name="recipe-category"
              values={recipeCategories}
              placeholder="Изберете"
              rhfRegister={register("recipeCategory")}
              className="mt-4"
          ></Select>
        </div>
        <div className="flex flex-col items-center justify-center font-montserrat w-full">
          <Select
              label="Изберете група на ястието"
              id="recipe-group"
              name="recipe-group"
              values={recipeGroups}
              placeholder="Изберете"
              rhfRegister={register("recipeGroup")}
              className="mt-4"
          ></Select>
        </div>

        <div className="flex flex-col items-center justify-center font-montserrat w-full mt-12">
          <Button
              disabled={isSubmitting}
              type="submit"
              className="bg-gradient-to-t from-app-yellow to-app-yellow p-2"
              btnText={isSubmitting ? "Търсене..." : "Търси"}
          ></Button>
        </div>

        <div className="flex flex-col items-center justify-center font-montserrat w-full mt-2">
          {errors.root && (
              <p className="text-center font-montserrat text-app-red">
                {errors.root.message}
              </p>
          )}
        </div>
      </form>
  );
}
