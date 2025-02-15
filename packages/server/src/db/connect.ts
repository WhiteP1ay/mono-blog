import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Post } from "../post/post.entity";
import { PostComment } from "../postComment/postComment.entity";
import { Tag } from "../tag/tag.entity";
import { Category } from "../category/category.entity";
import { User } from "../user/user.entity";
import { Sentence } from "../sentence/sentence.entity";
import { SentenceComment } from "../sentenceComment/sentenceComment.entity";
import { init } from "./init";
// 加载根目录的环境变量
dotenv.config({ path: "../../.env" });

export const dataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  timezone: "Z",
  entities: [Post, PostComment, Tag, Category, User, Sentence, SentenceComment],
  synchronize: process.env.ENV === "development",
});

export const connectDb = async () => {
  try {
    await dataSource.initialize();
    console.log("✨ 数据库连接成功！");
    await init();
  } catch (error) {
    console.error("❌ 数据库连接失败:", (error as Error).message);
  }
};
