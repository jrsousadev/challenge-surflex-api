import { prismaClient } from "../database/prismaClient";

interface ICreateOrigin {
  name: string;
  url: string;
}

interface IGetOrigin {
  id: string;
}

interface IDeleteOrigin {
  id: string;
}

export class OriginRepository {
  async create(data: ICreateOrigin) {
    try {
      return await prismaClient.origin.create({
        data,
      });
    } catch (err) {
      throw err;
    }
  }

  async getOne({ id }: IGetOrigin) {
    try {
      return await prismaClient.origin.findFirst({
        where: {
          id,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async delete({ id }: IDeleteOrigin) {
    try {
      await prismaClient.origin.delete({
        where: {
          id,
        },
      });
    } catch (err) {
      throw err;
    }
  }
}
