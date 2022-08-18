import { uuid } from "uuidv4";
import { CreateCharacterServiceInMemory } from "./in-memory/CreateCharacterServiceInMemory";

let createCharacterServiceInMemory: CreateCharacterServiceInMemory;

describe("Service Create Character", () => {
  beforeEach(() => {
    createCharacterServiceInMemory = new CreateCharacterServiceInMemory();
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
