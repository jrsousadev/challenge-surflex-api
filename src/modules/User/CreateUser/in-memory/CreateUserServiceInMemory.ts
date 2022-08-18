import { UserRepositoryInMemory } from "../../../../repositories/in-memory/UserRepositoryInMemory";
import { cryptedPassword } from "../../../../services/password/cryptedPassword";
import { CustomError } from "../../../../shared/errors/CustomError";

interface IRequest {
  name: string;
  password: string;
}

export class CreateUserServiceInMemory {
  constructor(private userRepository: UserRepositoryInMemory) {}

  async execute({ name, password }: IRequest) {
    try {
      const userExist = await this.userRepository.getOne({ name });

      if (userExist) throw new CustomError("User is exist", 400);

      await this.userRepository.create({
        name,
        password: await cryptedPassword(password),
      });

      const user = this.userRepository.getOne({ name });

      return user;
    } catch (err) {
      throw err;
    }
  }
}
