import { Request, Response } from "express";
import { CharacterRepository } from "../../../repositories/CharacterRepository";
import { LocationRepository } from "../../../repositories/LocationRepository";
import { OriginRepository } from "../../../repositories/OriginRepository";
import { CustomError } from "../../../shared/errors/CustomError";
import { DeleteCharacterService } from "./DeleteCharacterService";

export class DeleteCharacterController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const characterRepository = new CharacterRepository();
      const originRepository = new OriginRepository();
      const locationRepository = new LocationRepository();
      const deleteCharacterService = new DeleteCharacterService(
        characterRepository,
        originRepository,
        locationRepository
      );
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
