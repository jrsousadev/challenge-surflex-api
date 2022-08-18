import { CharacterRepository } from "../../../repositories/CharacterRepository";
import { LocationRepository } from "../../../repositories/LocationRepository";
import { OriginRepository } from "../../../repositories/OriginRepository";
import { CustomError } from "../../../shared/errors/CustomError";
interface IRequest {
  id: number;
}

export class DeleteCharacterService {
  constructor(
    private characterRepository: CharacterRepository,
    private originRepository: OriginRepository,
    private locationRepository: LocationRepository
  ) {}
  async execute({ id }: IRequest) {
    try {
      const characterExist = await this.characterRepository.getOne({ id });
      if (!characterExist) throw new CustomError("Character is not exist", 400);

      await this.characterRepository.delete({ id });
      await this.originRepository.delete({ id: characterExist.originId });
      await this.locationRepository.delete({ id: characterExist.locationId });

      return true;
    } catch (err) {
      throw err;
    }
  }
}
