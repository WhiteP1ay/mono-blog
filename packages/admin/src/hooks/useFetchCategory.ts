import { useQuery } from "@tanstack/react-query";
import { fetchCategoryList } from "@api/category";

export const useFetchCategory = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: fetchCategoryList,
  });
};
