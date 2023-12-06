import { useQuery } from "@tanstack/react-query";
import HttpService from "../../services/http/HttpService";

export function useCurrentUser() {
  const api = HttpService.getInstance();

  return useQuery({
    queryKey: ["currentUser"],
    queryFn: api.User.getCurrentUser,
  });
}
