import { dataSource } from "../db/connect";
import { Post } from "./post.entity";
import type { PostDTO } from "./post.types";
import { In, Like } from "typeorm";

export class PostService {
  private postRepository = dataSource.getRepository(Post);

  // 获取所有博文
  async findAll(
    search?: string,
    categoryId?: string,
    tags?: string
  ): Promise<Post[]> {
    const where: any = {};
    if (search) {
      where.title = Like(`%${search}%`);
    }
    if (categoryId) {
      where.categoryId = Number(categoryId);
    }
    if (tags) {
      const tagsArray = tags.split(",");
      where.tags = { id: In(tagsArray) };
    }
    return this.postRepository.find({
      where,
      order: { createdAt: "DESC" },
      relations: ["category", "tags"]
    });
  }

  // 获取单个博文
  async findById(id: string): Promise<Post | null> {
    return this.postRepository.findOne({
      where: { id: Number(id) },
      relations: ["category", "tags"]
    });
  }

  // 创建博文
  async create(data: PostDTO): Promise<Post> {
    const post = this.postRepository.create(data);
    return this.postRepository.save(post);
  }

  // 更新博文
  async update(id: string, data: Partial<PostDTO>): Promise<Post> {
    await this.postRepository.update(id, data);
    return this.postRepository.findOneByOrFail({ id: Number(id) });
  }

  // 删除博文
  async delete(id: string): Promise<void> {
    await this.postRepository.delete(id);
  }

  // 批量创建博文
  async createMany(posts: PostDTO[]): Promise<Post[]> {
    const entities = posts.map((post) => this.postRepository.create(post));
    return this.postRepository.save(entities);
  }
}
