import { UserRepositoryInMemory } from "../../../repositories/in-memory/UserRepositoryInMemory";
import { GetUserService } from "./GetUserService";

let userRepository: UserRepositoryInMemory;
let getUserService: GetUserService;

describe("Get One User", () => {
  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    getUserService = new GetUserService(userRepository);
  });

  it("Deve ser capaz de retornar um usuário!", async () => {
    const userCreated = await userRepository.create({
      name: "Teste",
      password: "Teste123",
    });

    const user = await getUserService.execute({
      id: userCreated.id,
    });

    expect(user).toHaveProperty("id");
  });

  it("Não deve ser capaz de retornar um usuário inexistente", async () => {
    expect(async () => {
      await getUserService.execute({
        id: "123",
      });
    }).rejects.toEqual({ message: "User is not exist", name: "", status: 400 });
  });
});
