import Title from "../components/Title";
import FindRecipeForm from "./FindRecipe/FindRecipeForm";
import {useState} from "react";
import RecipeCard from "../components/Recipes/RecipeCard";

export default function FindRecipe() {
    const [recipes, setRecipes] = useState([]);

    const handleRecipesChange = (recipes) => {
        setRecipes(recipes);
    };

  return (
    <div className="pt-20">
      <h1 className="text-center text-xl py-8">
        <Title text="Открий рецепта"></Title>
      </h1>

      <div className="w-11/12 mx-auto mb-10">
        <FindRecipeForm setRecipes={handleRecipesChange}/>
      </div>

      <div className="w-11/12 mx-auto mb-10 flex flex-col gap-4">
          {recipes.map((recipe) => (
              <RecipeCard key={recipe.image} recipe={recipe} />
          ))}
      </div>
    </div>
  );
}
