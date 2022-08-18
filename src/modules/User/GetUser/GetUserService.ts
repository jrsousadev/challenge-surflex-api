import { CustomError } from "../../../shared/errors/CustomError";
import { UserRepository } from "../../../repositories/UserRepository";

interface IRequest {
  name?: string;
  id?: string;
}

export class GetUserService {
  constructor(private userRepository: UserRepository) {}
  async execute({ id, name }: IRequest) {
    try {
      const user = await this.userRepository.getOne({ id, name });

      if (!user) throw new CustomError("User is not exist", 400);

      return user;
    } catch (err) {
      throw err;
    }
  }
}
