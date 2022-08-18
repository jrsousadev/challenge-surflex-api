import { CharacterRepositoryInMemory } from "../../../repositories/in-memory/CharacterRepositoryInMemory";
import { LocationRepositoryInMemory } from "../../../repositories/in-memory/LocationRepositoryInMemory";
import { OriginRepositoryInMemory } from "../../../repositories/in-memory/OriginRepositoryInMemory";
import { CreateCharacterService } from "../CreateCharacter/CreateCharacterService";
import { GetAllCharacterService } from "./GetAllCharacterService";

let createCharacterService: CreateCharacterService;
let characterRepository: CharacterRepositoryInMemory;
let originRepository: OriginRepositoryInMemory;
let locationRepository: LocationRepositoryInMemory;
let getAllCharacterService: GetAllCharacterService;

describe("Get All Characters", () => {
  beforeEach(() => {
    characterRepository = new CharacterRepositoryInMemory();
    originRepository = new OriginRepositoryInMemory();
    locationRepository = new LocationRepositoryInMemory();
    createCharacterService = new CreateCharacterService(
      characterRepository,
      originRepository,
      locationRepository
    );
    getAllCharacterService = new GetAllCharacterService(characterRepository);
  });

  it("Deve ser capaz de retornar um array de personagem!", async () => {
    const charaterOne = await createCharacterService.execute({
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
      userId: "123",
    });

    const charaterTwo = await createCharacterService.execute({
      episode: ["episode1", "episode2"],
      gender: "Male",
      id: 2,
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
      userId: "123",
    });

    const characters = await getAllCharacterService.execute({
      id: "123",
      name: "",
      species: "",
    });

    expect(characters).not.toBe(undefined);
  });
});
