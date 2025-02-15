import { Hono } from "hono";
import { CategoryService } from "./category.service";

export class CategoryController {
  public router: Hono;
  private categoryService: CategoryService;

  constructor() {
    this.router = new Hono();
    this.categoryService = new CategoryService();
    this.setupRoutes();
  }

  private setupRoutes() {
    // 获取所有分类
    this.router.get("/", async (c) => {
      const categories = await this.categoryService.findAll();
      return c.json({ success: true, data: categories });
    });
  }
}
