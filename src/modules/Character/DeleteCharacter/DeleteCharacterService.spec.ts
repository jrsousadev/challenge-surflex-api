import { uuid } from "uuidv4";
import { CharacterRepositoryInMemory } from "../../../repositories/in-memory/CharacterRepositoryInMemory";
import { LocationRepositoryInMemory } from "../../../repositories/in-memory/LocationRepositoryInMemory";
import { OriginRepositoryInMemory } from "../../../repositories/in-memory/OriginRepositoryInMemory";
import { CreateCharacterService } from "../CreateCharacter/CreateCharacterService";
import { DeleteCharacterService } from "./DeleteCharacterService";

let createCharacterService: CreateCharacterService;
let deleteCharacterService: DeleteCharacterService;
let characterRepository: CharacterRepositoryInMemory;
let originRepository: OriginRepositoryInMemory;
let locationRepository: LocationRepositoryInMemory;

describe("Service Delete Character", () => {
  beforeEach(() => {
    characterRepository = new CharacterRepositoryInMemory();
    originRepository = new OriginRepositoryInMemory();
    locationRepository = new LocationRepositoryInMemory();
    createCharacterService = new CreateCharacterService(
      characterRepository,
      originRepository,
      locationRepository
    );
    deleteCharacterService = new DeleteCharacterService(
      characterRepository,
      originRepository,
      locationRepository
    );
  });

  it("Não deve ser capaz de deletar um personagem que não existe!", async () => {
    await createCharacterService.execute({
      episode: ["episode1", "episode2"],
      gender: "Male",
      id: 1,
      image: "image.img",
      location: {
        name: "locationName",
        url: "location.com",
      },
      name: "name",
      origin: {
        name: "originName",
        url: "origin.com",
      },
      species: "Human",
      status: "Alive",
      type: "",
      url: "test.com",
      userId: uuid(),
    });

    expect(async () => {
      await deleteCharacterService.execute({
        id: 2,
      });
    }).rejects.toEqual({
      message: "Character is not exist",
      name: "",
      status: 400,
    });
  });

  it("Deve ser capaz de deletar o personagem com sucesso", async () => {
    await createCharacterService.execute({
      episode: ["episode1", "episode2"],
      gender: "Male",
      id: 1,
      image: "image.img",
      location: {
        name: "locationName",
        url: "location.com",
      },
      name: "name",
      origin: {
        name: "originName",
        url: "origin.com",
      },
      species: "Human",
      status: "Alive",
      type: "",
      url: "test.com",
      userId: uuid(),
    });

    const character = await deleteCharacterService.execute({
      id: 1,
    });

    expect(character).toBe(undefined);
  });
});
