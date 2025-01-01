import {Link} from "react-router-dom";

export default function RecipeCard({ recipe, config = { showMissingProducts: true } }) {
    return (
        <Link key={recipe.image} to={"recipe/" + recipe._id} state={recipe}>
            <div className="border border-app-darkBlue rounded-2xl py-2 px-4 min-h-[5rem] flex flex-col items-start justify-center">
                <p className="text-xl text-app-lightBlue uppercase font-semibold italic break-all">
                    {recipe.name}
                </p>
                {shouldShowMissingProducts() && (
                    <p className="text-md text-app-darkBlue uppercase font-semibold italic break-all">
                        липсващи продукти: { recipe.missingProductsCount }
                    </p>
                )}
            </div>
        </Link>
    );

    function shouldShowMissingProducts() {
        return config.showMissingProducts && Number.isInteger(recipe.missingProductsCount);
    }
}
