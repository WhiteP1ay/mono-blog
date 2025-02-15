import type { Context, Next } from "hono";

const transformUndefined = (obj: any): any => {
  if (obj === undefined) return null;
  if (obj === null) return null;

  if (typeof obj === "object") {
    if (Array.isArray(obj)) {
      return obj.map((item) => transformUndefined(item));
    }

    const result: any = {};
    for (const key in obj) {
      result[key] = transformUndefined(obj[key]);
    }
    return result;
  }

  return obj;
};

export async function transformResponseMiddleware(c: Context, next: Next) {
  // 保存原始的 json 方法
  const originalJson = c.json.bind(c);

  // 重写 json 方法
  c.json = (obj: any, ...args: any[]) => {
    const transformed = transformUndefined(obj);
    console.log("middleware");
    return originalJson(transformed, ...args);
  };

  await next();
}
