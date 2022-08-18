import { Request, Response } from "express";
import { CharacterRepository } from "../../../repositories/CharacterRepository";
import { CustomError } from "../../../shared/errors/CustomError";
import { GetCharacterService } from "./GetCharacterService";

export class GetCharacterController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const characterRepository = new CharacterRepository();
      const getCharacterService = new GetCharacterService(characterRepository);
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
