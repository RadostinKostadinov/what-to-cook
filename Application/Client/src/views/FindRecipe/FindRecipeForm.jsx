import { useForm } from "react-hook-form";
import Checkbox from "../../components/Checkbox";
import Select from "../../components/Select";
import { recipeCategories, recipeGroups } from "../../constants";
import Button from "../../components/Button";

export default function FindRecipeForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    // try {
    //   const res = await api.User.addProductToFridge({
    //     name: data.name,
    //     amount: data.amount,
    //     alertAmount: data.alertAmount,
    //   });
    //   queryClient.invalidateQueries({
    //     queryKey: ["currentUser", "Fridge"],
    //     exact: true,
    //   });
    //   reset();
    // } catch (err) {
    //   setError("root", {
    //     message: "Проблем при създаването",
    //   });
    // }
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
    </form>
  );
}
