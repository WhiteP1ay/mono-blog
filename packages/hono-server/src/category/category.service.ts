import { dataSource } from "../db/connect";
import { Category } from "./category.entity";

export class CategoryService {
  private categoryRepository = dataSource.getRepository(Category);

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }
}
