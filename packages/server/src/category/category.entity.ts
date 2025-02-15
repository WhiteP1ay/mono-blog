import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Post } from "../post/post.entity";

@Entity("category")
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  name!: string;

  @OneToMany(() => Post, (post) => post.category)
  posts!: Post[];
}
