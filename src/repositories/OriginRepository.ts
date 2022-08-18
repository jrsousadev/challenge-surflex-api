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
      console.log(err);
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
      console.log(err);
    }
  }

  async delete({ id }: IDeleteOrigin) {
    try {
      return await prismaClient.origin.delete({
        where: {
          id,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
}
