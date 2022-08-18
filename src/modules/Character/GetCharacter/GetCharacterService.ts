import { CharacterRepository } from "../../../repositories/CharacterRepository";
import { CustomError } from "../../../shared/errors/CustomError";
const characterRepository = new CharacterRepository();

interface IRequest {
  id: number;
}

export class GetCharacterService {
  async execute({ id }: IRequest) {
    try {
      const character = await characterRepository.getOne({ id });

      if (!character) throw new CustomError("Character is not exist", 400);

      return character;
    } catch (err) {
      throw err;
    }
  }
}
