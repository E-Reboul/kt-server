import { Request, Response } from "express";
import QuestionService from "../services/QuestionService";

class QuestionController {

    private questionService: QuestionService;

    constructor() {
        this.questionService = new QuestionService();
    }

    public async getAllQuestions(req: Request, res: Response): Promise<void> {
        try {
            const questions = await this.questionService.getAll();
            res.status(200).json(questions);
        } catch (error) {
            console.error('Failed to retrieve all questions:', error);
            res.status(500).json({ message: 'Impossible de récupérer les questions.' });
        }
    }

    public async getQuestionById(req: Request, res: Response): Promise<void> {
        const questionId = parseInt(req.params.id, 10);

        if (isNaN(questionId)) {
            res.status(400).json({ message: 'ID question invalide.' });
            return;
        }

        try {
            const question = await this.questionService.getById(questionId);
            if (!question) {
                res.status(404).json({ message: 'Question introuvable.' });
                return;
            }
            res.status(200).json(question);
        } catch (error) {
            console.error('Failed to retrieve question by ID:', error);
            res.status(500).json({ message: 'Impossible de récupérer la question.' });
        }
    }

    public async createQuestion(req: Request, res: Response): Promise<void> {
        const questionData = req.body;

        try {
            const createdResult = await this.questionService.create(questionData);
            if (!createdResult) {
                res.status(400).json({ message: 'Échec de la création de la question.' });
                return;
            }
            res.status(201).json({ message: 'Question créé avec succès.' });
        } catch (error) {
            console.error('Failed to create question:', error);
            res.status(500).json({ message: 'Impossible de créer la question.' });
        }
    }

    public async updateQuestion(req: Request, res: Response): Promise<void> {
        const questionId = parseInt(req.params.id, 10);

        if (isNaN(questionId)) {
            res.status(400).json({ message: 'ID question invalide.' });
            return;
        }

        const questionData = req.body;

        try {
            const updatedResult = await this.questionService.update(questionId, questionData);
            if (!updatedResult) {
                res.status(400).json({ message: 'Échec de la mise à jour de la question.' });
                return;
            }
            res.status(200).json({ message: 'Question mis à jour avec succès.' });
        } catch (error) {
            console.error('Failed to update question:', error);
            res.status(500).json({ message: 'Impossible de mettre à jour la question.' });
        }
    }

    public async deleteQuestion(req: Request, res: Response): Promise<void> {
        const questionId = parseInt(req.params.id, 10);
        
        if (isNaN(questionId)) {
            res.status(400).json({ message: 'ID question invalide.' });
            return;
        }

        try {
            const deletedResult = await this.questionService.delete(questionId);
            if (!deletedResult) {
                res.status(400).json({ message: 'Échec de la suppression de la question.' });
                return;
            }
            res.status(200).json({ message: 'Question supprimé avec succès.' });
        } catch (error) {
            console.error('Failed to delete question:', error);
            res.status(500).json({ message: 'Impossible de supprimer la question.' });
        }
    }

    public async getQuestionsByQuizz(req: Request, res: Response): Promise<void> {
        const quizzId = parseInt(req.params.id, 10);

        if (isNaN(quizzId)) {
            res.status(400).json({ message: 'ID quizz invalide.' });
            return;
        }

        try {
            const questions = await this.questionService.getQuestionsByQuizz(quizzId);
            res.status(200).json(questions);
        } catch (error) {
            console.error('Failed to retrieve all questions:', error);
            res.status(500).json({ message: 'Impossible de récupérer les questions.' });
        }
    }
}

export default QuestionController;