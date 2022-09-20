import { Router } from "express";
import UserController from "../controller/user.controller";
import CreateUserDto from "../controller/dto/createUser.dto";

const userRoutes = Router();

userRoutes.post("/create", CreateUserDto.validate, UserController.create);
userRoutes.post("/sign", UserController.sign);
userRoutes.get("/findAll", UserController.findAllUser);

export default userRoutes;
