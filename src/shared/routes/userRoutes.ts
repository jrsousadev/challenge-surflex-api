import { Router } from "express";
import { AuthenticationUserController } from "../../modules/User/AuthenticationUser/AuthenticationUserController";
import { CreateUserController } from "../../modules/User/CreateUser/CreateUserController";
import { GetUserController } from "../../modules/User/GetUser/GetUserController";
import { auth } from "../middlewares/auth";

const userRoutes = Router();

const createUserController = new CreateUserController();
userRoutes.post("/", createUserController.handle);

const authenticationUserController = new AuthenticationUserController();
userRoutes.post("/login", authenticationUserController.handle);

userRoutes.use(auth);

const getUserController = new GetUserController();
userRoutes.get("/:id", getUserController.handle);

export default userRoutes;
