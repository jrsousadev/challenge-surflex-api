import { CharacterRepository } from "../../../repositories/CharacterRepository";
const characterRepository = new CharacterRepository();

interface IRequest {
  id: string;
  name: string;
  species: string;
}

export class GetAllCharacterService {
  async execute({ id, name, species }: IRequest) {
    try {
      const character = await characterRepository.getAll({ id, name, species });

      if (!character) return [];

      return character;
    } catch (err) {
      throw err;
    }
  }
}
