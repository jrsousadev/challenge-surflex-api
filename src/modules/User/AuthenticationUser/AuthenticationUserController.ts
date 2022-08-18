import { Request, Response } from "express";
import { UserRepository } from "../../../repositories/UserRepository";
import { CustomError } from "../../../shared/errors/CustomError";
import { AuthenticationUserService } from "./AuthenticationUserService";

export class AuthenticationUserController {
  async handle(request: Request, response: Response) {
    const { name, password } = request.body;

    try {
      const userRepository = new UserRepository();
      const authenticationUserService = new AuthenticationUserService(
        userRepository
      );
      const user = await authenticationUserService.execute({
        name,
        password,
      });

      return response.status(200).json(user);
    } catch (err) {
      if (err instanceof CustomError) {
        response.status(err.status).json({ message: err.message });
      }
    }
  }
}
