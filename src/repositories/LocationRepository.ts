import { prismaClient } from "../database/prismaClient";

interface ICreateLocation {
  name: string;
  url: string;
}

interface IGetLocation {
  id: string;
}

interface IDeleteLocation {
  id: string;
}

export class LocationRepository {
  async create(data: ICreateLocation) {
    try {
      return await prismaClient.location.create({
        data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async getOne({ id }: IGetLocation) {
    try {
      return await prismaClient.location.findFirst({
        where: {
          id,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  async delete({ id }: IDeleteLocation) {
    try {
      await prismaClient.location.delete({
        where: {
          id,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
}
