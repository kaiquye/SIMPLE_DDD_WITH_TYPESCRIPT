import { Router } from "express";
import UserController from "../controller/user.controller";

const userRoutes = Router();

userRoutes.post("/create", UserController.create);
userRoutes.post("/sign", UserController.sign);
userRoutes.get("/findAll", UserController.findAllUser);

export default userRoutes;
