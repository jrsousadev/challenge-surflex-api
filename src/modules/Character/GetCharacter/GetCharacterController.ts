import { Request, Response } from "express";
import { CustomError } from "../../../shared/errors/CustomError";
import { GetCharacterService } from "./GetCharacterService";

export class GetCharacterController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const getCharacterService = new GetCharacterService();
      const character = await getCharacterService.execute({
        id: Number(id),
      });

      return response.status(200).json(character);
    } catch (err) {
      if (err instanceof CustomError) {
        response.status(err.status).json({ message: err.message });
      }
    }
  }
}
