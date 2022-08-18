import { User } from "@prisma/client";
import { compare } from "bcryptjs";

export const verifyPassword = async (password: string, user: User) => {
  return await compare(password.toString(), user.password.toString());
};
