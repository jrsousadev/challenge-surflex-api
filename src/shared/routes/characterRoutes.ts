import { Router } from "express";
import { CreateCharacterController } from "../../modules/Character/CreateCharacter/CreateCharacterController";
import { DeleteCharacterController } from "../../modules/Character/DeleteCharacter/DeleteCharacterController";
import { GetAllCharacterController } from "../../modules/Character/GetAllCharacter/GetAllCharacterController";
import { GetCharacterController } from "../../modules/Character/GetCharacter/GetCharacterController";

const characterRoutes = Router();

const createCharacterController = new CreateCharacterController();
characterRoutes.post("/", createCharacterController.handle);

const deleteCharacterController = new DeleteCharacterController();
characterRoutes.delete("/:id", deleteCharacterController.handle);

const getCharacterController = new GetCharacterController();
characterRoutes.get("/:id", getCharacterController.handle);

const getAllCharacterController = new GetAllCharacterController();
characterRoutes.get("/", getAllCharacterController.handle);

export default characterRoutes;
