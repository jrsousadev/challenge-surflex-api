import { Request, Response } from "express";
import { CustomError } from "../../../shared/errors/CustomError";
import { GetUserService } from "./GetUserService";

export class GetUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const getUserService = new GetUserService();
      const user = await getUserService.execute({
        id,
      });

      return response.status(200).json(user);
    } catch (err) {
      if (err instanceof CustomError) {
        response.status(err.status).json({ message: err.message });
      }
    }
  }
}
