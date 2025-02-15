import { dataSource } from "./connect";
import { Category } from "../category/category.entity";
import { categories } from "../constants/categories";

const createCategories = async () => {
  const categoryRepository = dataSource.getRepository(Category);
  await categoryRepository.save(categories);
};

export const init = async () => {
  await createCategories();
};
