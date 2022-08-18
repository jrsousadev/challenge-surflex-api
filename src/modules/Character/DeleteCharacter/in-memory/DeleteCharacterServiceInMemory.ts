import { CharacterRepositoryInMemory } from "../../../../repositories/in-memory/CharacterRepositoryInMemory";
import { LocationRepositoryInMemory } from "../../../../repositories/in-memory/LocationRepositoryInMemory";
import { OriginRepositoryInMemory } from "../../../../repositories/in-memory/OriginRepositoryInMemory";
import { CustomError } from "../../../../shared/errors/CustomError";

interface IRequest {
  id: number;
}

export class DeleteCharacterServiceInMemory {
  constructor(
    private characterRepository: CharacterRepositoryInMemory,
    private originRepository: OriginRepositoryInMemory,
    private locationRepository: LocationRepositoryInMemory
  ) {}

  async execute({ id }: IRequest) {
    try {
      const characterExist = await this.characterRepository.getOne({ id });
      if (!characterExist) throw new CustomError("Character is not exist", 400);

      const character = await this.characterRepository.delete({ id });

      await this.originRepository.delete({ id: characterExist.originId });
      await this.locationRepository.delete({ id: characterExist.locationId });

      return character;
    } catch (err) {
      throw err;
    }
  }
}
