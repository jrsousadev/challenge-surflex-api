import { CharacterRepository } from "../../../repositories/CharacterRepository";
import { LocationRepository } from "../../../repositories/LocationRepository";
import { OriginRepository } from "../../../repositories/OriginRepository";
import { CustomError } from "../../../shared/errors/CustomError";

const characterRepository = new CharacterRepository();
const originRepository = new OriginRepository();
const locationRepository = new LocationRepository();

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

export class CreateCharacterService {
  async execute(data: IRequest) {
    try {
      const characterExist = await characterRepository.getOne({
        id: Number(data.id),
      });

      const origin = await originRepository.create({
        name: data.origin.name ?? "unknown",
        url: data.origin.url ?? "",
      });

      const location = await locationRepository.create({
        name: data.location.name ?? "unknown",
        url: data.location.url ?? "",
      });

      console.log(location);

      if (characterExist) throw new CustomError("Character is exist", 400);

      await characterRepository.create({
        ...data,
        originId: origin?.id,
        locationId: location?.id,
      });

      const character = await characterRepository.getOne({
        id: Number(data.id),
      });

      return character;
    } catch (err) {
      throw err;
    }
  }
}
