import { hash } from "bcryptjs";

export const cryptedPassword = async (password: string) => {
  return await hash(password, 8);
};
