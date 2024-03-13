import { useQuery } from "@tanstack/react-query";
import HttpService from "../../services/http/HttpService";

export function useAllProducts() {
  const api = HttpService.getInstance();

  return useQuery({
    queryKey: ["allProducts"],
    queryFn: api.Product.getAllProducts,
  });
}
