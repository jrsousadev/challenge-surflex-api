import { Request, Response } from "express";
import { CustomError } from "../../../shared/errors/CustomError";
import { GetAllCharacterService } from "./GetAllCharacterService";

export class GetAllCharacterController {
  async handle(request: Request, response: Response) {
    const { id } = request.user;
    const { name, species } = request.query;

    try {
      const getAllCharacterService = new GetAllCharacterService();
      const character = await getAllCharacterService.execute({
        id,
        name: String(name),
        species: String(species),
      });

      return response.status(200).json(character);
    } catch (err) {
      if (err instanceof CustomError) {
        response.status(err.status).json({ message: err.message });
      }
    }
  }
}
