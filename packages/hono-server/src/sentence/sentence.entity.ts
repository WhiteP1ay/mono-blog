import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { SentenceComment } from "../sentenceComment/sentenceComment.entity";

@Entity("sentences")
export class Sentence {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text")
  content!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => SentenceComment, (comment) => comment.sentence, {
    onDelete: "CASCADE"
  })
  comments!: SentenceComment[];
}
