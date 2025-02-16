import "reflect-metadata";
import { serve } from "@hono/node-server";
import { createApp } from "./app";
import { connectDb } from "./db/connect";
import dotenv from "dotenv";
dotenv.config();

async function bootstrap() {
  await connectDb();

  const port = Number(process.env.APP_PORT) || 3000;
  const host = "localhost";

  const app = createApp();

  console.log(`Server is running on http://${host}:${port}`);

  serve({
    fetch: app.fetch,
    port,
    hostname: host,
  });
}

bootstrap().catch(console.error);
