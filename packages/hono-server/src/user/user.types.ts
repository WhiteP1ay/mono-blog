import { User } from "./user.entity";

export type UserDTO = Pick<User, "username" | "password">;
export type UserUpdateDTO = Partial<
  Pick<User, "password" | "isAdmin" | "isVip">
>;

export interface LoginDTO {
  username: string;
  password: string;
}
