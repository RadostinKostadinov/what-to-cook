import Title from "../components/Title";
import FindRecipeForm from "./FindRecipe/FindRecipeForm";

export default function FindRecipe() {
  return (
    <div className="pt-20">
      <h1 className="text-center text-xl py-8">
        <Title text="Открий рецепта"></Title>
      </h1>

      <div className="w-11/12 mx-auto mb-10">
        <FindRecipeForm />
      </div>
    </div>
  );
}
