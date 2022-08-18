import { UserRepositoryInMemory } from "../../../repositories/in-memory/UserRepositoryInMemory";
import { AuthenticationUserService } from "./AuthenticationUserService";

let userRepository: UserRepositoryInMemory;
let authenticationUserService: AuthenticationUserService;

describe("Authentication User", () => {
  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    authenticationUserService = new AuthenticationUserService(userRepository);
  });

  it("Deve ser capaz de autenticar um usuário e retornar o token!", async () => {
    await userRepository.create({
      name: "Teste",
      password: "Teste123",
    });

    const response = await authenticationUserService.execute({
      name: "Teste",
      password: "Teste123",
    });

    expect(response).toHaveProperty("token");
  });

  it("Não deve ser capaz de autenticar um usuário inexistente!", async () => {
    expect(async () => {
      await authenticationUserService.execute({
        name: "Teste",
        password: "Teste1234",
      });
    }).rejects.toEqual({
      message: "Name or password incorret",
      name: "",
      status: 400,
    });
  });

  it("Não deve ser capaz de autenticar um usuário com a senha incorreta!", async () => {
    await userRepository.create({
      name: "Teste",
      password: "Teste123",
    });

    expect(async () => {
      await authenticationUserService.execute({
        name: "Teste",
        password: "Teste12",
      });
    }).rejects.toEqual({
      message: "Name or password incorret",
      name: "",
      status: 400,
    });
  });
});
