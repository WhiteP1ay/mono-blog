import { dataSource } from "../db/connect";
import { Sentence } from "./sentence.entity";
import type { SentenceDTO } from "./sentence.types";
import { Like } from "typeorm";

export class SentenceService {
  private sentenceRepository = dataSource.getRepository(Sentence);

  // 获取所有一句话
  async findAll(search?: string): Promise<Sentence[]> {
    const where: any = {};
    if (search) {
      where.content = Like(`%${search}%`);
    }
    return this.sentenceRepository.find({
      where,
      order: { createdAt: "DESC" },
      // relations: ["comments"]
    });
  }

  // 获取单个一句话
  async findById(id: string): Promise<Sentence | null> {
    return this.sentenceRepository.findOne({
      where: { id: Number(id) },
      relations: ["comments"],
    });
  }

  // 创建一句话
  async create(data: SentenceDTO): Promise<Sentence> {
    const sentence = this.sentenceRepository.create(data);
    return this.sentenceRepository.save(sentence);
  }

  // 更新一句话
  async update(id: string, data: Partial<SentenceDTO>): Promise<Sentence> {
    await this.sentenceRepository.update(id, data);
    return this.sentenceRepository.findOneByOrFail({ id: Number(id) });
  }

  // 删除一句话
  async delete(id: string): Promise<void> {
    await this.sentenceRepository.delete(id);
  }
}
