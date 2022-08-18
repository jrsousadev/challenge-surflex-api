import { v4 as uuidv4 } from "uuid";

interface ILocation {
  id: string;
  name: string;
  url: string;
}

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

export class LocationRepositoryInMemory {
  locations: ILocation[] = [];

  async create({ name, url }: ICreateLocation) {
    const locationCreated = {
      id: uuidv4(),
      name,
      url,
    };

    this.locations.push(locationCreated);
    return locationCreated;
  }

  async getOne({ id }: IGetLocation) {
    const location = this.locations.find((location) => location.id === id);
    return location;
  }

  async delete({ id }: IDeleteLocation) {
    this.locations.filter((location) => location.id !== id);
  }
}
