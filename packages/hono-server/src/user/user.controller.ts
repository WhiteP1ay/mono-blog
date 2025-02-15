import { Hono } from "hono";
import { UserService } from "./user.service";
import type { LoginDTO, UserDTO, UserUpdateDTO } from "./user.types";
import { generateToken } from "../utils/jwt";
import { authMiddleware, adminMiddleware } from "../middleware/auth";

export class UserController {
  public router: Hono;
  private userService: UserService;

  constructor() {
    this.router = new Hono();
    this.userService = new UserService();
    this.setupRoutes();
  }

  private setupRoutes() {
    // 登录
    this.router.post("/login", async (c) => {
      try {
        const { username, password }: LoginDTO = await c.req.json();
        const user = await this.userService.findByUsername(username);

        if (!user || user.password !== password) {
          return c.json({ success: false, error: "用户名或密码错误呢！" }, 401);
        }

        const token = generateToken({
          id: user.id,
          username: user.username,
          isAdmin: user.isAdmin,
          isVip: user.isVip,
        });

        return c.json({
          success: true,
          message: "登录成功啦~",
          token,
          username,
        });
      } catch (error) {
        return c.json({ success: false, error: (error as Error).message }, 500);
      }
    });

    // 注册
    this.router.post("/register", async (c) => {
      try {
        const data: UserDTO = await c.req.json();
        const user = await this.userService.create(data);
        return c.json({ success: true, data: user }, 201);
      } catch (error) {
        return c.json({ success: false, error: (error as Error).message }, 500);
      }
    });

    // 获取所有用户（需要管理员权限）
    this.router.get("/", authMiddleware, adminMiddleware, async (c) => {
      try {
        const users = await this.userService.findAll();
        return c.json({ success: true, data: users });
      } catch (error) {
        return c.json({ success: false, error: (error as Error).message }, 500);
      }
    });

    // 获取单个用户
    this.router.get("/:id", authMiddleware, async (c) => {
      try {
        const id = c.req.param("id");
        const user = await this.userService.findById(id);

        if (!user) {
          return c.json({ success: false, error: "用户不存在" }, 404);
        }

        return c.json({ success: true, data: user });
      } catch (error) {
        return c.json({ success: false, error: (error as Error).message }, 500);
      }
    });

    // 更新用户（需要管理员权限）
    this.router.put("/:id", authMiddleware, adminMiddleware, async (c) => {
      try {
        const id = c.req.param("id");
        const data: UserUpdateDTO = await c.req.json();
        const user = await this.userService.update(id, data);
        return c.json({ success: true, data: user });
      } catch (error) {
        return c.json({ success: false, error: (error as Error).message }, 500);
      }
    });

    // 删除用户（需要管理员权限）
    this.router.delete("/:id", authMiddleware, adminMiddleware, async (c) => {
      try {
        const id = c.req.param("id");
        await this.userService.delete(id);
        return c.json({ success: true });
      } catch (error) {
        return c.json({ success: false, error: (error as Error).message }, 500);
      }
    });
  }
}
