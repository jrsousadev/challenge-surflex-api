import { CharacterRepositoryInMemory } from "../../../repositories/in-memory/CharacterRepositoryInMemory";
import { LocationRepositoryInMemory } from "../../../repositories/in-memory/LocationRepositoryInMemory";
import { OriginRepositoryInMemory } from "../../../repositories/in-memory/OriginRepositoryInMemory";
import { CreateCharacterServiceInMemory } from "../CreateCharacter/in-memory/CreateCharacterServiceInMemory";
import { GetCharacterServiceInMemory } from "./in-memory/GetCharacterServiceInMemory";

let createCharacterServiceInMemory: CreateCharacterServiceInMemory;
let characterRepository: CharacterRepositoryInMemory;
let originRepository: OriginRepositoryInMemory;
let locationRepository: LocationRepositoryInMemory;
let getCharacterServiceInMemory: GetCharacterServiceInMemory;

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
    getCharacterServiceInMemory = new GetCharacterServiceInMemory(
      characterRepository
    );
  });

  it("Deve ser capaz de retornar um personagem!", async () => {
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

    const character = await getCharacterServiceInMemory.execute({
      id: 1,
    });

    expect(character).toHaveProperty("id");
  });

  it("Não deve ser capaz de retornar um personagem não existente!", async () => {
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

    expect(async () => {
      await getCharacterServiceInMemory.execute({
        id: 2,
      });
    }).rejects.toEqual({
      message: "Character is not exist",
      name: "",
      status: 400,
    });
  });
});
