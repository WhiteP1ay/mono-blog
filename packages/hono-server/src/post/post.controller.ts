import { Hono } from "hono";
import { PostService } from "./post.service";
import type { PostDTO } from "./post.types";
import { dataSource } from "../db/connect";
import { Category } from "../category/category.entity";
import type { Repository } from "typeorm";
import { adminMiddleware } from "../middleware/auth";

export class PostController {
  public router: Hono;
  private postService: PostService;
  private categoryRepository: Repository<Category>;

  constructor() {
    this.router = new Hono();
    this.postService = new PostService();
    this.setupRoutes();
    this.categoryRepository = dataSource.getRepository(Category);
  }

  private setupRoutes() {
    // 文章相关路由
    this.setupPostRoutes();
  }

  private setupPostRoutes() {
    // 获取所有博文
    this.router.get("/", async (c) => {
      try {
        const search = c.req.query("search");
        const categoryId = c.req.query("categoryId");
        const tags = c.req.query("tags");

        const posts = await this.postService.findAll(search, categoryId, tags);

        return c.json({ success: true, data: posts });
      } catch (error) {
        return c.json({ success: false, error: (error as Error).message }, 500);
      }
    });

    // 获取单个博文
    this.router.get("/:id", async (c) => {
      try {
        const id = c.req.param("id");
        const post = await this.postService.findById(id);

        if (!post) {
          return c.json({ success: false, error: "文章不存在" }, 404);
        }

        return c.json({ success: true, data: post });
      } catch (error) {
        return c.json({ success: false, error: (error as Error).message }, 500);
      }
    });

    // 创建博文
    this.router.post("/", adminMiddleware, async (c) => {
      try {
        const data: PostDTO = await c.req.json();
        const result = await this.postService.create(data);
        return c.json({ success: true, data: result }, 201);
      } catch (error) {
        return c.json({ success: false, error: (error as Error).message }, 500);
      }
    });

    // 更新博文
    this.router.put("/:id", adminMiddleware, async (c) => {
      try {
        const id = c.req.param("id");
        const data = await c.req.json();
        const result = await this.postService.update(id, data);
        return c.json({ success: true, data: result });
      } catch (error) {
        return c.json({ success: false, error: (error as Error).message }, 500);
      }
    });

    // 删除博文
    this.router.delete("/:id", adminMiddleware, async (c) => {
      try {
        const id = c.req.param("id");
        await this.postService.delete(id);
        return c.json({ success: true });
      } catch (error) {
        return c.json({ success: false, error: (error as Error).message }, 500);
      }
    });

    // 批量导入 Markdown 文件
    this.router.post("/import", adminMiddleware, async (c) => {
      try {
        const formData = await c.req.parseBody({ all: true });

        let files = formData["files"] as File[];

        if (files instanceof File) {
          files = [files];
        }

        const categoryId = c.req.query("categoryId");
        const category = await this.categoryRepository.findOneBy({
          id: categoryId ? Number(categoryId) : 1,
        });

        if (!category) {
          return c.json(
            {
              success: false,
              error: "分类不存在",
            },
            404
          );
        }

        // 验证是否有文件上传
        if (files.length === 0) {
          return c.json(
            {
              success: false,
              error: "请上传文件哦~",
            },
            400
          );
        }

        // 过滤出 .md 文件，并验证文件大小
        const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
        const markdownFiles = files.filter((file) => {
          if (!file.name.endsWith(".md")) return false;
          if (file.size > MAX_FILE_SIZE) {
            throw new Error(`文件 ${file.name} 超过 5MB 限制啦！`);
          }
          return true;
        });

        if (markdownFiles.length === 0) {
          return c.json(
            {
              success: false,
              error: "请上传 .md 文件呢~",
            },
            400
          );
        }

        // 处理文件内容
        const posts = await Promise.all(
          markdownFiles.map(async (file) => {
            const content = await file.text();

            // 验证文件内容不为空
            if (!content.trim()) {
              throw new Error(`文件 ${file.name} 内容为空呢~`);
            }

            return {
              title: file.name.replace(".md", ""),
              content: content,
              category: category,
              tags: [],
            };
          })
        );

        const result = await this.postService.createMany(posts);

        return c.json({ success: true, data: result }, 201);
      } catch (error) {
        console.error("导入文件失败:", error);
        return c.json(
          {
            success: false,
            error: (error as Error).message || "导入文件失败了呢~",
          },
          500
        );
      }
    });
  }
}
