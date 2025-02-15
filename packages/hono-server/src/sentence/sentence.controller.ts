import { Hono } from "hono";
import { SentenceService } from "./sentence.service";
import type { SentenceDTO } from "./sentence.types";
import { adminMiddleware } from "../middleware/auth";

export class SentenceController {
  public router: Hono;
  private sentenceService: SentenceService;

  constructor() {
    this.router = new Hono();
    this.sentenceService = new SentenceService();
    this.setupRoutes();
  }

  private setupRoutes() {
    // 获取所有一句话
    this.router.get("/", async (c) => {
      try {
        const search = c.req.query("search");
        const sentences = await this.sentenceService.findAll(search);
        return c.json({ success: true, data: sentences });
      } catch (error) {
        return c.json({ success: false, error: (error as Error).message }, 500);
      }
    });

    // 获取单个一句话
    this.router.get("/:id", async (c) => {
      try {
        const id = c.req.param("id");
        const sentence = await this.sentenceService.findById(id);

        if (!sentence) {
          return c.json({ success: false, error: "一句话不存在呢~" }, 404);
        }

        return c.json({ success: true, data: sentence });
      } catch (error) {
        return c.json({ success: false, error: (error as Error).message }, 500);
      }
    });

    // 创建一句话（需要管理员权限）
    this.router.post("/", adminMiddleware, async (c) => {
      try {
        const data: SentenceDTO = await c.req.json();
        const result = await this.sentenceService.create(data);
        return c.json({ success: true, data: result }, 201);
      } catch (error) {
        return c.json({ success: false, error: (error as Error).message }, 500);
      }
    });

    // 更新一句话（需要管理员权限）
    this.router.put("/:id", adminMiddleware, async (c) => {
      try {
        const id = c.req.param("id");
        const data = await c.req.json();
        const result = await this.sentenceService.update(id, data);
        return c.json({ success: true, data: result });
      } catch (error) {
        return c.json({ success: false, error: (error as Error).message }, 500);
      }
    });

    // 删除一句话（需要管理员权限）
    this.router.delete("/:id", adminMiddleware, async (c) => {
      try {
        const id = c.req.param("id");
        await this.sentenceService.delete(id);
        return c.json({ success: true });
      } catch (error) {
        return c.json({ success: false, error: (error as Error).message }, 500);
      }
    });
  }
} 