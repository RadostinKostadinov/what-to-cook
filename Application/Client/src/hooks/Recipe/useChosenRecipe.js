import { useQuery } from "@tanstack/react-query";
import HttpService from "../../services/http/HttpService";

export function useChosenRecipe(recipeId) {
    const api = HttpService.getInstance();

    console.log(recipeId);
    return useQuery({
        queryKey: ["chosenRecipe", recipeId],
        queryFn: () =>api.Recipe.getRecipe(recipeId),
        enabled: !!recipeId,
        staleTime: 1000 * 60 * 15 // 15 minutes
    });
}
