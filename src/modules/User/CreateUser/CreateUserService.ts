import { cryptedPassword } from "../../../services/password/cryptedPassword";
import { CustomError } from "../../../shared/errors/CustomError";
import { UserRepository } from "../../../repositories/UserRepository";

interface IRequest {
  name: string;
  password: string;
}

export class CreateUserService {
  constructor(private userRepository: UserRepository) {}
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
