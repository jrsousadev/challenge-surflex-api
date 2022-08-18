import { Request, Response } from "express";
import { CustomError } from "../../../shared/errors/CustomError";
import { CreateCharacterService } from "./CreateCharacterService";

export class CreateCharacterController {
  async handle(request: Request, response: Response) {
    const {
      id,
      name,
      status,
      species,
      type,
      gender,
      image,
      episode,
      url,
      origin,
      location,
    } = request.body;
    const { id: userId } = request.user;

    try {
      const createCharacterService = new CreateCharacterService();
      const character = await createCharacterService.execute({
        id,
        name,
        status,
        episode,
        gender,
        image,
        species,
        type,
        url,
        userId,
        origin,
        location,
      });

      return response.status(201).json(character);
    } catch (err) {
      if (err instanceof CustomError) {
        response.status(err.status).json({ message: err.message });
      }
    }
  }
}
