import { useQuery } from "@tanstack/react-query";
import HttpService from "../../services/http/HttpService";

export function useCurrentUserFridge() {
  const api = HttpService.getInstance();

  return useQuery({
    queryKey: ["currentUser", "Fridge"],
    queryFn: api.User.getCurrentUserFridge,
  });
}
