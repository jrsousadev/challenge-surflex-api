import { Request, Response } from "express";
import { UserRepository } from "../../../repositories/UserRepository";
import { CustomError } from "../../../shared/errors/CustomError";
import { CreateUserService } from "./CreateUserService";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, password } = request.body;

    try {
      const userRepository = new UserRepository();
      const createUserService = new CreateUserService(userRepository);
      const user = await createUserService.execute({
        name,
        password,
      });

      return response.status(201).json(user);
    } catch (err) {
      if (err instanceof CustomError) {
        response.status(err.status).json({ message: err.message });
      }
    }
  }
}
