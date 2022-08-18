import { prismaClient } from "../database/prismaClient";

interface ICreateUser {
  name: string;
  password: string;
}

interface IGetUser {
  id?: string;
  name?: string;
}

export class UserRepository {
  async create(data: ICreateUser) {
    try {
      return await prismaClient.user.create({
        data,
      });
    } catch (err) {
      throw err;
    }
  }

  async getOne({ id, name }: IGetUser) {
    try {
      if (id) {
        return await prismaClient.user.findFirst({
          where: {
            id,
          },
        });
      }

      return await prismaClient.user.findFirst({
        where: {
          name,
        },
      });
    } catch (err) {
      throw err;
    }
  }
}
