import { UserRepositoryInMemory } from "../../../../repositories/in-memory/UserRepositoryInMemory";
import { verifyPassword } from "../../../../services/password/verifyPassword";
import { generateToken } from "../../../../services/token/generateToken";
import { CustomError } from "../../../../shared/errors/CustomError";

interface IRequest {
  name: string;
  password: string;
}

export class AuthenticationUserServiceInMemory {
  constructor(private userRepository: UserRepositoryInMemory) {}

  async execute({ name, password }: IRequest) {
    try {
      const user = await this.userRepository.getOne({ name });

      if (!user) throw new CustomError("Name or password incorret", 400);

      const correctPassword = await verifyPassword(password, user);

      if (!correctPassword) {
        throw new CustomError("Name or password incorret", 400);
      }

      return {
        token: generateToken(user),
        user,
      };
    } catch (err) {
      throw err;
    }
  }
}
