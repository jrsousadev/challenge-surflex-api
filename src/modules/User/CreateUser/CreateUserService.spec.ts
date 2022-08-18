import { UserRepositoryInMemory } from "../../../repositories/in-memory/UserRepositoryInMemory";
import { CreateUserService } from "./CreateUserService";

let userRepository: UserRepositoryInMemory;
let createUserService: CreateUserService;

describe("Service Create Character", () => {
  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    createUserService = new CreateUserService(userRepository);
  });

  it("Deve ser capaz de criar um usuário com sucesso!", async () => {
    const userCreated = await createUserService.execute({
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
      await createUserService.execute({
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
