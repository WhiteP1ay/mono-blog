import { Hono } from "hono";
import { registerRoutes } from "./routes";

export function createApp() {
  const app = new Hono().basePath("/api");

  registerRoutes(app);

  return app;
}
