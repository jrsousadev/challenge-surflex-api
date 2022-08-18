import { CharacterRepositoryInMemory } from "../../../../repositories/in-memory/CharacterRepositoryInMemory";

interface IRequest {
  id: string;
  name: string;
  species: string;
}

export class GetAllCharacterServiceInMemory {
  constructor(private characterRepository: CharacterRepositoryInMemory) {}
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
