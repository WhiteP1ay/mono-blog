import type { Context, Next } from "hono";
import { decodeToken } from "../utils/jwt";

export async function authMiddleware(c: Context, next: Next) {
  try {
    const user = decodeToken(c);
    if (!user) {
      return c.json({ success: false, error: "token无效或已过期啦！" }, 401);
    }
    c.set("user", user);
    await next();
  } catch (error) {
    return c.json({ success: false, error: "token无效或已过期啦！" }, 401);
  }
}

export async function adminMiddleware(c: Context, next: Next) {
  const user = decodeToken(c);
  if (!user?.isAdmin) {
    return c.json({ success: false, error: "需要管理员权限呢！" }, 403);
  }

  await next();
}
