import { Post } from "./post.entity";

export type PostDTO = Pick<Post, "title" | "content" | "tags" | "category">;
