import { Hono } from "hono";
import { PostController } from "../post/post.controller";
import { PostCommentController } from "../postComment/postComment.controller";
import { CategoryController } from "../category/category.controller";
import { UserController } from "../user/user.controller";
import { SentenceController } from "../sentence/sentence.controller";
import { SentenceCommentController } from "../sentenceComment/sentenceComment.controller";

export function registerRoutes(app: Hono) {
  // 基础路由
  app.get("/", (c) => {
    return c.text("Hello Hono!");
  });

  // 文章
  app.route("/post", new PostController().router);

  // 评论
  app.route("/comment", new PostCommentController().router);

  // 一句话
  app.route("/sentence", new SentenceController().router);

  // 分类
  app.route("/category", new CategoryController().router);

  // 用户
  app.route("/user", new UserController().router);

  // 一句话评论
  app.route("/sentence-comment", new SentenceCommentController().router);
}
