import { uuid } from "uuidv4";
import { CharacterRepositoryInMemory } from "../../../repositories/in-memory/CharacterRepositoryInMemory";
import { LocationRepositoryInMemory } from "../../../repositories/in-memory/LocationRepositoryInMemory";
import { OriginRepositoryInMemory } from "../../../repositories/in-memory/OriginRepositoryInMemory";
import { CreateCharacterServiceInMemory } from "../CreateCharacter/in-memory/CreateCharacterServiceInMemory";
import { DeleteCharacterServiceInMemory } from "./in-memory/DeleteCharacterServiceInMemory";

let createCharacterServiceInMemory: CreateCharacterServiceInMemory;
let deleteCharacterServiceInMemory: DeleteCharacterServiceInMemory;
let characterRepository: CharacterRepositoryInMemory;
let originRepository: OriginRepositoryInMemory;
let locationRepository: LocationRepositoryInMemory;

describe("Service Delete Character", () => {
  beforeEach(() => {
    characterRepository = new CharacterRepositoryInMemory();
    originRepository = new OriginRepositoryInMemory();
    locationRepository = new LocationRepositoryInMemory();
    createCharacterServiceInMemory = new CreateCharacterServiceInMemory(
      characterRepository,
      originRepository,
      locationRepository
    );
    deleteCharacterServiceInMemory = new DeleteCharacterServiceInMemory(
      characterRepository,
      originRepository,
      locationRepository
    );
  });

  it("Não deve ser capaz de deletar um personagem que não existe!", async () => {
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

    expect(async () => {
      await deleteCharacterServiceInMemory.execute({
        id: 2,
      });
    }).rejects.toEqual({
      message: "Character is not exist",
      name: "",
      status: 400,
    });
  });

  it("Deve ser capaz de deletar o personagem com sucesso", async () => {
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

    const characters = await deleteCharacterServiceInMemory.execute({
      id: 1,
    });

    expect(characters).not.toBe(undefined);
  });
});
