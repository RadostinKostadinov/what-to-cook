import { useQuery } from "@tanstack/react-query";
import HttpService from "../../services/http/HttpService";

export function useCurrentUserRecipes() {
  const api = HttpService.getInstance();

  return useQuery({
    queryKey: ["currentUserRecipes"],
    queryFn: api.Recipe.getCurrentUserRecipes,
  });
}
