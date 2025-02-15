import type { RowDataPacket } from "mysql2";

export interface Comment extends RowDataPacket {
  id: number;
  content: string;
  nickname: string;
  createdAt: Date;
  postId?: number;
  sentenceId?: number;
}

export interface PostCommentDTO {
  content: string;
  nickname: string;
  postId: number;
}
