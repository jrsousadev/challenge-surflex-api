import { CharacterRepositoryInMemory } from "../../../repositories/in-memory/CharacterRepositoryInMemory";
import { LocationRepositoryInMemory } from "../../../repositories/in-memory/LocationRepositoryInMemory";
import { OriginRepositoryInMemory } from "../../../repositories/in-memory/OriginRepositoryInMemory";
import { CreateCharacterServiceInMemory } from "../CreateCharacter/in-memory/CreateCharacterServiceInMemory";
import { GetAllCharacterServiceInMemory } from "./in-memory/GetAllCharacterServiceInMemory";

let createCharacterServiceInMemory: CreateCharacterServiceInMemory;
let characterRepository: CharacterRepositoryInMemory;
let originRepository: OriginRepositoryInMemory;
let locationRepository: LocationRepositoryInMemory;
let getAllCharacterServiceInMemory: GetAllCharacterServiceInMemory;

describe("Get All Characters", () => {
  beforeEach(() => {
    characterRepository = new CharacterRepositoryInMemory();
    originRepository = new OriginRepositoryInMemory();
    locationRepository = new LocationRepositoryInMemory();
    createCharacterServiceInMemory = new CreateCharacterServiceInMemory(
      characterRepository,
      originRepository,
      locationRepository
    );
    getAllCharacterServiceInMemory = new GetAllCharacterServiceInMemory(
      characterRepository
    );
  });

  it("Deve ser capaz de retornar um array de personagem!", async () => {
    const charaterOne = await createCharacterServiceInMemory.execute({
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

    const charaterTwo = await createCharacterServiceInMemory.execute({
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

    const characters = await getAllCharacterServiceInMemory.execute({
      id: "123",
      name: "",
      species: "",
    });

    expect(characters).not.toBe(undefined);
  });
});
