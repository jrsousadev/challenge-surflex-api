import { CharacterRepositoryInMemory } from "../../../../repositories/in-memory/CharacterRepositoryInMemory";
import { LocationRepositoryInMemory } from "../../../../repositories/in-memory/LocationRepositoryInMemory";
import { OriginRepositoryInMemory } from "../../../../repositories/in-memory/OriginRepositoryInMemory";
import { CustomError } from "../../../../shared/errors/CustomError";
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
  constructor(
    private characterRepository: CharacterRepositoryInMemory,
    private originRepository: OriginRepositoryInMemory,
    private locationRepository: LocationRepositoryInMemory
  ) {}

  async execute(data: IRequest) {
    try {
      const characterExist = await this.characterRepository.getOne({
        id: Number(data.id),
      });

      const origin = await this.originRepository.create({
        name: data.origin.name ?? "unknown",
        url: data.origin.url ?? "",
      });

      const location = await this.locationRepository.create({
        name: data.location.name ?? "unknown",
        url: data.location.url ?? "",
      });

      if (characterExist) throw new CustomError("Character is exist", 400);

      await this.characterRepository.create({
        ...data,
        originId: origin?.id,
        locationId: location?.id,
      });

      const character = await this.characterRepository.getOne({
        id: Number(data.id),
      });

      return character;
    } catch (err) {
      throw err;
    }
  }
}
