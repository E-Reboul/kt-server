import { Router } from "express";
import CharactersController from "../controllers/Characters";

const charactersController = new CharactersController();

const charactersRoute = Router();

charactersRoute.get("/", charactersController.getAllCharacters.bind(charactersController));
charactersRoute.get("/:id", charactersController.getCharacterById.bind(charactersController));
charactersRoute.post("/", charactersController.createCharacter.bind(charactersController));
charactersRoute.put("/:id", charactersController.updateCharacter.bind(charactersController));
charactersRoute.delete("/:id", charactersController.deleteCharacter.bind(charactersController));

export default charactersRoute;
