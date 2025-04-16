import { Router } from "express";
import CharactersController from "../controllers/Character";

const charactersController = new CharactersController();

const charactersRoute = Router();

charactersRoute.get("/", charactersController.getAll.bind(charactersController));
charactersRoute.get("/:id", charactersController.getById.bind(charactersController));
charactersRoute.post("/", charactersController.create.bind(charactersController));
charactersRoute.put("/:id", charactersController.update.bind(charactersController));
charactersRoute.delete("/:id", charactersController.delete.bind(charactersController));

export default charactersRoute;
