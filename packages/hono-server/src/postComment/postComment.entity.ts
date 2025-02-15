import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Post } from "../post/post.entity";

@Entity("postComment")
export class PostComment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text")
  content!: string;

  @Column("varchar")
  nickname!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => Post, (post) => post.comments, {
    onDelete: "CASCADE",
    nullable: true,
  })
  @JoinColumn({ name: "postId" })
  post?: Post;
}
