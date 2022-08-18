import { CharacterRepository } from "../../../repositories/CharacterRepository";
import { CustomError } from "../../../shared/errors/CustomError";

interface IRequest {
  id: number;
}

export class GetCharacterService {
  constructor(private characterRepository: CharacterRepository) {}
  async execute({ id }: IRequest) {
    try {
      const character = await this.characterRepository.getOne({ id });

      if (!character) throw new CustomError("Character is not exist", 400);

      return character;
    } catch (err) {
      throw err;
    }
  }
}
