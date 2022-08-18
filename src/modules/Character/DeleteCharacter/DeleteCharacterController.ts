import { Request, Response } from "express";
import { CustomError } from "../../../shared/errors/CustomError";
import { DeleteCharacterService } from "./DeleteCharacterService";

export class DeleteCharacterController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const deleteCharacterService = new DeleteCharacterService();
      const character = await deleteCharacterService.execute({
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
