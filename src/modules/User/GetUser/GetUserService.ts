import { cryptedPassword } from "../../../services/password/cryptedPassword";
import { CustomError } from "../../../shared/errors/CustomError";
import { UserRepository } from "../../../repositories/UserRepository";
const userRepository = new UserRepository();

interface IRequest {
  name?: string;
  id?: string;
}

export class GetUserService {
  async execute({ id, name }: IRequest) {
    try {
      const user = await userRepository.getOne({ id, name });

      if (!user) throw new CustomError("User is exist", 400);

      return user;
    } catch (err) {
      throw err;
    }
  }
}
