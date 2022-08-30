import { CharacterRepository } from "../../../repositories/CharacterRepository";
import { LocationRepository } from "../../../repositories/LocationRepository";
import { OriginRepository } from "../../../repositories/OriginRepository";
import { CustomError } from "../../../shared/errors/CustomError";
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
  constructor(
    private characterRepository: CharacterRepository,
    private originRepository: OriginRepository,
    private locationRepository: LocationRepository
  ) {}

  async execute(data: IRequest) {
    try {
      const origin = await this.originRepository.create({
        name: data.origin.name ?? "unknown",
        url: data.origin.url ?? "",
      });

      const location = await this.locationRepository.create({
        name: data.location.name ?? "unknown",
        url: data.location.url ?? "",
      });

      data.id = Math.round((Math.random() * 3000));

      if (location && origin) {
        await this.characterRepository.create({
          ...data,
          originId: origin.id,
          locationId: location.id,
        });
      }
      
      const character = await this.characterRepository.getOne({
        id: Number(data.id),
        userId: String(data.userId),
      });

      return character;
    } catch (err) {
      throw err;
    }
  }
}
