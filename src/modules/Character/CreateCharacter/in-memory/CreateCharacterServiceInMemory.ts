import { CharacterRepositoryInMemory } from "../../../../repositories/in-memory/CharacterRepositoryInMemory";
import { LocationRepositoryInMemory } from "../../../../repositories/in-memory/LocationRepositoryInMemory";
import { OriginRepositoryInMemory } from "../../../../repositories/in-memory/OriginRepositoryInMemory";
import { CustomError } from "../../../../shared/errors/CustomError";

const characterRepositoryInMemory = new CharacterRepositoryInMemory();
const originRepositoryInMemory = new OriginRepositoryInMemory();
const locationRepositoryInMemory = new LocationRepositoryInMemory();

interface IRequest {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: "Female" | "Male" | "unknown";
  image: string;
  episode: string[];
  userId: string;
  url: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
}

export class CreateCharacterServiceInMemory {
  async execute(data: IRequest) {
    try {
      const characterExist = await characterRepositoryInMemory.getOne({
        id: Number(data.id),
      });

      const origin = await originRepositoryInMemory.create({
        name: data.origin.name ?? "unknown",
        url: data.origin.url ?? "",
      });

      const location = await locationRepositoryInMemory.create({
        name: data.location.name ?? "unknown",
        url: data.location.url ?? "",
      });

      if (characterExist) throw new CustomError("Character is exist", 400);

      await characterRepositoryInMemory.create({
        ...data,
        originId: origin?.id,
        locationId: location?.id,
      });

      const character = await characterRepositoryInMemory.getOne({
        id: Number(data.id),
      });

      return character;
    } catch (err) {
      throw err;
    }
  }
}
