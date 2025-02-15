import { Hono } from "hono";
import { PostCommentService } from "./postComment.service";
import type { PostCommentDTO } from "./postComment.types";
import { adminMiddleware } from "../middleware/auth";

export class PostCommentController {
  public router: Hono;
  private commentService: PostCommentService;

  constructor() {
    this.router = new Hono();
    this.commentService = new PostCommentService();
    this.setupRoutes();
  }

  private setupRoutes() {
    // 获取评论列表
    this.router.get("/", async (c) => {
      try {
        const postId = c.req.query("postId");
        const comments = await this.commentService.find(postId);
        return c.json({ success: true, data: comments });
      } catch (error) {
        return c.json({ success: false, error: (error as Error).message }, 500);
      }
    });

    // 添加评论
    this.router.post("/", async (c) => {
      try {
        const data: PostCommentDTO = await c.req.json();
        const comment = await this.commentService.create(data);
        return c.json({ success: true, data: comment });
      } catch (error) {
        return c.json({ success: false, error: (error as Error).message }, 500);
      }
    });

    // 删除评论
    this.router.delete("/:id", adminMiddleware, async (c) => {
      try {
        const id = c.req.param("id");
        await this.commentService.delete(Number(id));
        return c.json({ success: true });
      } catch (error) {
        return c.json({ success: false, error: (error as Error).message }, 500);
      }
    });
  }
}
