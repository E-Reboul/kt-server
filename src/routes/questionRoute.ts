import { Router } from "express";
import QuestionController from "../controllers/QuestionController";

const questionController = new QuestionController();

const questionRoute = Router();

// base routes
questionRoute.get("/", questionController.getAllQuestions.bind(questionController));
questionRoute.get("/:id", questionController.getQuestionById.bind(questionController));
questionRoute.post("/", questionController.createQuestion.bind(questionController));
questionRoute.put("/:id", questionController.updateQuestion.bind(questionController));
questionRoute.delete("/:id", questionController.deleteQuestion.bind(questionController));

// additional routes
questionRoute.get("/quizz/:id", questionController.getQuestionsByQuizz.bind(questionController));

export default questionRoute;