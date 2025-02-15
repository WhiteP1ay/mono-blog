import { dataSource } from "../db/connect";
import { PostComment } from "./postComment.entity";
import type { PostCommentDTO } from "./postComment.types";
import { Post } from "../post/post.entity";

export class PostCommentService {
  private commentRepository = dataSource.getRepository(PostComment);
  private postRepository = dataSource.getRepository(Post);

  // 获取评论列表
  async find(postId?: string): Promise<PostComment[]> {
    const where: any = {};
    if (postId) {
      where.post = { id: Number(postId) };
    }
    return this.commentRepository.find({
      where,
      order: { createdAt: "DESC" },
      relations: ["post"],
    });
  }

  // 创建评论
  async create(data: PostCommentDTO): Promise<PostComment> {
    const post = await this.postRepository.findOneBy({ id: data.postId });
    if (!post) {
      throw new Error("文章不存在哦~");
    }
    const comment = this.commentRepository.create({
      content: data.content,
      nickname: data.nickname,
      post,
    });
    return this.commentRepository.save(comment);
  }

  // 删除评论
  async delete(id: number): Promise<void> {
    await this.commentRepository.delete(id);
  }
}
