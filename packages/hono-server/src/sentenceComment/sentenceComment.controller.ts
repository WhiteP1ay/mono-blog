import { Hono } from "hono";
import { SentenceCommentService } from "./sentenceComment.service";
import type { SentenceCommentDTO } from "./sentenceComment.types";
import { adminMiddleware } from "../middleware/auth";

export class SentenceCommentController {
  public router: Hono;
  private commentService: SentenceCommentService;

  constructor() {
    this.router = new Hono();
    this.commentService = new SentenceCommentService();
    this.setupRoutes();
  }

  private setupRoutes() {
    // 获取所有评论
    this.router.get("/", async (c) => {
      try {
        const comments = await this.commentService.findAll();
        return c.json({ success: true, data: comments });
      } catch (error) {
        return c.json({ success: false, error: (error as Error).message }, 500);
      }
    });

    // 获取单个评论
    this.router.get("/:id", async (c) => {
      try {
        const id = c.req.param("id");
        const comment = await this.commentService.findById(id);

        if (!comment) {
          return c.json({ success: false, error: "评论不存在呢~" }, 404);
        }

        return c.json({ success: true, data: comment });
      } catch (error) {
        return c.json({ success: false, error: (error as Error).message }, 500);
      }
    });

    // 创建评论
    this.router.post("/", async (c) => {
      try {
        const data: SentenceCommentDTO = await c.req.json();
        const result = await this.commentService.create(data);
        return c.json({ success: true, data: result }, 201);
      } catch (error) {
        return c.json({ success: false, error: (error as Error).message }, 500);
      }
    });

    // 更新评论（需要管理员权限）
    this.router.put("/:id", adminMiddleware, async (c) => {
      try {
        const id = c.req.param("id");
        const data = await c.req.json();
        const result = await this.commentService.update(id, data);
        return c.json({ success: true, data: result });
      } catch (error) {
        return c.json({ success: false, error: (error as Error).message }, 500);
      }
    });

    // 删除评论（需要管理员权限）
    this.router.delete("/:id", adminMiddleware, async (c) => {
      try {
        const id = c.req.param("id");
        await this.commentService.delete(id);
        return c.json({ success: true });
      } catch (error) {
        return c.json({ success: false, error: (error as Error).message }, 500);
      }
    });
  }
} 