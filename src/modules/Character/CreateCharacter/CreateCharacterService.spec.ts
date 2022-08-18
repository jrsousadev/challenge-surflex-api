import { uuid } from "uuidv4";
import { CharacterRepositoryInMemory } from "../../../repositories/in-memory/CharacterRepositoryInMemory";
import { LocationRepositoryInMemory } from "../../../repositories/in-memory/LocationRepositoryInMemory";
import { OriginRepositoryInMemory } from "../../../repositories/in-memory/OriginRepositoryInMemory";
import { CreateCharacterServiceInMemory } from "./in-memory/CreateCharacterServiceInMemory";

let createCharacterServiceInMemory: CreateCharacterServiceInMemory;
let characterRepository: CharacterRepositoryInMemory;
let originRepository: OriginRepositoryInMemory;
let locationRepository: LocationRepositoryInMemory;

describe("Service Create Character", () => {
  beforeEach(() => {
    characterRepository = new CharacterRepositoryInMemory();
    originRepository = new OriginRepositoryInMemory();
    locationRepository = new LocationRepositoryInMemory();
    createCharacterServiceInMemory = new CreateCharacterServiceInMemory(
      characterRepository,
      originRepository,
      locationRepository
    );
  });

  it("Deve ser capaz de criar um personagem com sucesso!", async () => {
    const character = await createCharacterServiceInMemory.execute({
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

    expect(character).toHaveProperty("userId");
    expect(character).toHaveProperty("originId");
    expect(character).toHaveProperty("locationId");
    expect(character).toBe(character);
  });

  it("Não deve ser capaz de criar um personagem com o mesmo id", async () => {
    expect(async () => {
      await createCharacterServiceInMemory.execute({
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

      await createCharacterServiceInMemory.execute({
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
    }).rejects.toEqual({
      message: "Character is exist",
      name: "",
      status: 400,
    });
  });
});
