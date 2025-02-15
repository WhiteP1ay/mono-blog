import { dataSource } from "../db/connect";
import { SentenceComment } from "./sentenceComment.entity";
import type { SentenceCommentDTO } from "./sentenceComment.types";
import { Sentence } from "../sentence/sentence.entity";
export class SentenceCommentService {
  private commentRepository = dataSource.getRepository(SentenceComment);
  private sentenceRepository = dataSource.getRepository(Sentence);
  // 获取评论列表
  async findAll(): Promise<SentenceComment[]> {
    return this.commentRepository.find({
      relations: ["sentence"],
      order: { createdAt: "DESC" },
    });
  }

  // 获取单个评论
  async findById(id: string): Promise<SentenceComment | null> {
    return this.commentRepository.findOne({
      where: { id: Number(id) },
      relations: ["sentence"],
    });
  }

  // 创建评论
  async create(data: SentenceCommentDTO): Promise<SentenceComment> {
    const sentence = await this.sentenceRepository.findOneBy({
      id: data.sentenceId,
    });
    if (!sentence) {
      throw new Error("一句话不存在哦~");
    }
    const comment = this.commentRepository.create({ ...data, sentence });
    return this.commentRepository.save(comment);
  }

  // 更新评论
  async update(
    id: string,
    data: Partial<SentenceCommentDTO>
  ): Promise<SentenceComment> {
    await this.commentRepository.update(id, data);
    return this.commentRepository.findOneByOrFail({ id: Number(id) });
  }

  // 删除评论
  async delete(id: string): Promise<void> {
    await this.commentRepository.delete(id);
  }
}
