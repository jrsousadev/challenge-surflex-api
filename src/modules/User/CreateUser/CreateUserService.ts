import { cryptedPassword } from "../../../services/password/cryptedPassword";
import { CustomError } from "../../../shared/errors/CustomError";
import { UserRepository } from "../../../repositories/UserRepository";
const userRepository = new UserRepository();

interface IRequest {
  name: string;
  password: string;
}

export class CreateUserService {
  async execute({ name, password }: IRequest) {
    try {
      const userExist = await userRepository.getOne({ name });

      if (userExist) throw new CustomError("User is exist", 400);

      await userRepository.create({
        name,
        password: await cryptedPassword(password),
      });

      const user = userRepository.getOne({ name });

      return user;
    } catch (err) {
      throw err;
    }
  }
}
