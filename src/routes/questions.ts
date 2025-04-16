import { Router } from "express";
import QuestionController from "../controllers/QuestionController";

const questionController = new QuestionController();

const questionRoute = Router();

questionRoute.get("/", questionController.getAllQuestions.bind(questionController));
questionRoute.get("/:id", questionController.getQuestionById.bind(questionController));
questionRoute.post("/", questionController.createQuestion.bind(questionController));
questionRoute.put("/:id", questionController.updateQuestion.bind(questionController));
questionRoute.delete("/:id", questionController.deleteQuestion.bind(questionController));
questionRoute.get("/quizz/:id", questionController.filterQuestionsByQuizz.bind(questionController));

export default questionRoute;