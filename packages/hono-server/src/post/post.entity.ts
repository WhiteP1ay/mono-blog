import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinColumn,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { PostComment } from "../postComment/postComment.entity";
import { Tag } from "../tag/tag.entity";
import { Category } from "../category/category.entity";
@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  title!: string;

  @Column("text")
  content!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => PostComment, (comment) => comment.post)
  comments!: PostComment[];

  @ManyToMany(() => Tag, (tag) => tag.posts)
  @JoinTable({ name: "post_tags" })
  tags!: Tag[];

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn({ name: "categoryId" })
  category!: Category;
}
