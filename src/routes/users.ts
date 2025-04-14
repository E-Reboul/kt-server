import { Router } from "express";
import UsersController from "../controllers/UsersController";

const usersController = new UsersController();

const usersRoute = Router();

usersRoute.get("/", usersController.getAllUsers.bind(usersController));
usersRoute.get("/:id", usersController.getUserById.bind(usersController));
usersRoute.post("/", usersController.createUser.bind(usersController));
usersRoute.put("/:id", usersController.updateUser.bind(usersController));
usersRoute.delete("/:id", usersController.deleteUser.bind(usersController));

export default usersRoute;