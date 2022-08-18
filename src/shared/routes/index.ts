import { Router } from "express";
import { auth } from "../middlewares/auth";
import characterRoutes from "./characterRoutes";
import userRoutes from "./userRoutes";

const routes = Router();

routes.use("/user", userRoutes);
routes.use(auth);
routes.use("/character", characterRoutes);

export default routes;
