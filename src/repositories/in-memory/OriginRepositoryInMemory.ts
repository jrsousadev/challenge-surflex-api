import { v4 as uuidv4 } from "uuid";

interface IOrigin {
  id: string;
  name: string;
  url: string;
}

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

export class OriginRepositoryInMemory {
  origins: IOrigin[] = [];

  async create({ name, url }: ICreateOrigin) {
    const originCreated = {
      id: uuidv4(),
      name,
      url,
    };

    this.origins.push(originCreated);
    return originCreated;
  }

  async getOne({ id }: IGetOrigin) {
    const origin = this.origins.find((origin) => origin.id === id);
    return origin;
  }

  async delete({ id }: IDeleteOrigin) {
    this.origins.filter((origin) => origin.id === id);
  }
}
