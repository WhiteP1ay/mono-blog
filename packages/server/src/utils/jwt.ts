import type { Context } from "hono";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function generateToken(payload: any): string {
  return jwt.sign(payload, JWT_SECRET!, { expiresIn: "7d" });
}

export function verifyToken(token: string): any {
  return jwt.verify(token, JWT_SECRET!);
}

export function decodeToken(c: Context): any {
  const token = c.req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return false
  }

  const decoded = verifyToken(token);

  return decoded;
}
