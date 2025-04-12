import { Router } from "express";
import QuizzController from "../controllers/QuizzController";

const quizzController = new QuizzController();

const quizzRoute = Router();

// Routes CRUD de base
quizzRoute.get("/", quizzController.getAllQuizzes.bind(quizzController));
quizzRoute.get("/:id", quizzController.getQuizzById.bind(quizzController));
quizzRoute.post("/", quizzController.createQuizz.bind(quizzController));
quizzRoute.put("/:id", quizzController.updateQuizz.bind(quizzController));
quizzRoute.delete("/:id", quizzController.deleteQuizz.bind(quizzController));

// Routes supplémentaires
quizzRoute.get("/user/:userId", quizzController.getQuizzesByUser.bind(quizzController));
quizzRoute.get("/departement/:departementId", quizzController.getQuizzesByDepartement.bind(quizzController));

export default quizzRoute;