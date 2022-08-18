import { uuid } from "uuidv4";
import { UserRepositoryInMemory } from "../../../repositories/in-memory/UserRepositoryInMemory";
import { CreateUserServiceInMemory } from "./in-memory/CreateUserServiceInMemory";

let userRepository: UserRepositoryInMemory;
let createUserServiceInMemory: CreateUserServiceInMemory;

describe("Service Create Character", () => {
  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    createUserServiceInMemory = new CreateUserServiceInMemory(userRepository);
  });

  it("Deve ser capaz de criar um usuário com sucesso!", async () => {
    const userCreated = await createUserServiceInMemory.execute({
      name: "Teste",
      password: "Teste123",
    });

    expect(userCreated).toHaveProperty("id");
  });

  it("Não deve ser capaz de criar um usuário com o mesmo nome!", async () => {
    await userRepository.create({
      name: "Teste",
      password: "Teste1234",
    });

    expect(async () => {
      await createUserServiceInMemory.execute({
        name: "Teste",
        password: "Teste123",
      });
    }).rejects.toEqual({
      message: "User is exist",
      name: "",
      status: 400,
    });
  });
});
