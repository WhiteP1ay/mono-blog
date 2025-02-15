import { dataSource } from "../db/connect";
import { User } from "./user.entity";
import type { UserDTO, UserUpdateDTO } from "./user.types";

export class UserService {
  private userRepository = dataSource.getRepository(User);

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id: Number(id) });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOneBy({ username });
  }

  async create(data: UserDTO): Promise<User> {
    const existingUser = await this.findByUsername(data.username);
    if (existingUser) {
      throw new Error("用户名已存在啦！");
    }
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async update(id: string, data: UserUpdateDTO): Promise<User> {
    await this.userRepository.update(id, data);
    return this.userRepository.findOneByOrFail({ id: Number(id) });
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
} 