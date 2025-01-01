import React from "react";
import {useQueryClient} from "@tanstack/react-query";
import HttpService from "../../services/http/HttpService";
import {redirect, useLocation} from "react-router-dom";
import Title from "../../components/Title";
import {API_URL} from "../../constants";
import PillLabelDisplay from "../../components/PillLabelDisplay";
import {useChosenRecipe} from "../../hooks/Recipe/useChosenRecipe";
import Button from "../../components/Button";

export default function ViewRecipe() {
    const location = useLocation();
    const recipeNotPopulated = location.state || null;
    const { data, isLoading, error } = useChosenRecipe(recipeNotPopulated._id);

    if (isLoading) return <div className="pt-20 text-center">Loading...</div>;
    if (error) {
        return (
            <div className="pt-20 text-center">
                Server Error. Please contact administrator.
            </div>
        );
    }

    const recipe = data.data.recipe;
    console.log(recipe);

    return (
        <div className="pt-20">
            <h1 className="text-center text-xl py-8">
                <Title text="Рецепта"></Title>
            </h1>
            <h2 className="text-center text-lg">
                <p className="text-app-lightBlue uppercase font-bold italic font-montserrat">
                    {recipe.name}
                </p>
            </h2>

            <div className="w-11/12 mx-auto my-10">
                <img
                    src={API_URL + '/api/images/' + recipe.image}
                    alt="Uploaded"
                    className="w-auto h-full max-h-96 object-cover rounded-lg mx-auto"
                />
            </div>

            <div className="w-11/12 mx-auto mb-10 grid xs:grid-cols-1 md:grid-cols-3 gap-4">
                <PillLabelDisplay label="Време за приготвяне"
                                  value={recipe.preparationTime + " минути"}></PillLabelDisplay>
                <PillLabelDisplay label="Време за готвене" value={recipe.cookingTime + " минути"}></PillLabelDisplay>
                <PillLabelDisplay label="Общо време" value={recipe.totalTime + " минути"}></PillLabelDisplay>
                <PillLabelDisplay label="Порции" value={recipe.portions}></PillLabelDisplay>
                <PillLabelDisplay label="Категория" value={recipe.category}></PillLabelDisplay>
                <PillLabelDisplay label="Група" value={recipe.group}></PillLabelDisplay>
            </div>

            <div className="w-11/12 mx-auto mb-10 flex flex-col items-center justify-center">
                <h3 className="text-app-lightBlue uppercase font-bold italic font-montserrat text-md">НЕОБХОДИМИ ПРОДУКТИ</h3>
                <ul className="list-disc mt-1">
                    {recipe.products.map((ingredient) => (
                        <li key={ingredient.product.id}
                            className="text-md text-app-darkBlue w-full lowercase"
                        >
                            {ingredient.product.name} - {ingredient.amount} {ingredient.product.measurementUnit}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="w-11/12 mx-auto mb-10 flex flex-col items-center justify-center">
                <h3 className="text-app-lightBlue uppercase font-bold italic font-montserrat text-md">
                    НАЧИН НА ПРИГОТВЯНЕ
                </h3>
                <p>
                    {recipe.description}
                </p>
            </div>

            <div className="w-11/12 mx-auto mb-10 flex flex-col gap-4 justify-center items-center">
                <Button btnText="Сготвих го"></Button>
                <Button btnText="Назад"></Button>
            </div>
        </div>
    );
}