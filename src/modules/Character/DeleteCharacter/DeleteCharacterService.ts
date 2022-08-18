import { CharacterRepository } from "../../../repositories/CharacterRepository";
import { LocationRepository } from "../../../repositories/LocationRepository";
import { OriginRepository } from "../../../repositories/OriginRepository";
import { CustomError } from "../../../shared/errors/CustomError";

const characterRepository = new CharacterRepository();
const originRepository = new OriginRepository();
const locationRepository = new LocationRepository();

interface IRequest {
  id: number;
}

export class DeleteCharacterService {
  async execute({ id }: IRequest) {
    try {
      const characterExist = await characterRepository.getOne({ id });
      if (!characterExist) throw new CustomError("Character is exist", 400);

      const character = await characterRepository.delete({ id });

      await originRepository.delete({ id: characterExist.origin.id });
      await locationRepository.delete({ id: characterExist.location.id });

      return character;
    } catch (err) {
      throw err;
    }
  }
}
