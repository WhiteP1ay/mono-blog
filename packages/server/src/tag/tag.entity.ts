import { Post } from "../post/post.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";

@Entity("tags")
export class Tag {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  name!: string;

  @ManyToMany(() => Post, (post) => post.tags)
  posts!: Post[];
}
