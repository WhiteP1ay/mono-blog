import { fetchApi } from "@utils/fetchUtils";
import type { ListRes } from "@api/base.types";

export type Category = {
  id: number;
  name: string;
};

export const fetchCategoryList = async () => {
  return fetchApi<ListRes<Category>>(`/api/category`);
};
