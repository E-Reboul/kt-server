import { Router } from "express";
import AnswerController from "../controllers/AnswerController";

const answerController = new AnswerController();

const answerRoute = Router();

// base routes
answerRoute.get("/", answerController.getAllAnswers.bind(answerController));
answerRoute.get("/:id", answerController.getAnswerById.bind(answerController));
answerRoute.post("/", answerController.createAnswer.bind(answerController));
answerRoute.put("/:id", answerController.updateAnswer.bind(answerController));
answerRoute.delete("/:id", answerController.deleteAnswer.bind(answerController));

// additional routes
answerRoute.get("/quizz/:id", answerController.getAnswersByQuizz.bind(answerController));
answerRoute.get("/question/:id", answerController.getAnswersByQuestion.bind(answerController));

export default answerRoute;