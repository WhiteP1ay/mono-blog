import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Sentence } from "../sentence/sentence.entity";

@Entity("sentence_comments")
export class SentenceComment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text")
  content!: string;

  @Column("varchar")
  nickname!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => Sentence, (sentence) => sentence.comments, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "sentenceId" })
  sentence!: Sentence;
} 