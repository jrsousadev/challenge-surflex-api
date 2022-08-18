import { CharacterRepository } from "../../../repositories/CharacterRepository";
interface IRequest {
  id: string;
  name: string;
  species: string;
}

export class GetAllCharacterService {
  constructor(private characterRepository: CharacterRepository) {}
  async execute({ id, name, species }: IRequest) {
    try {
      const character = await this.characterRepository.getAll({
        id,
        name,
        species,
      });

      if (!character) return [];

      return character;
    } catch (err) {
      throw err;
    }
  }
}
