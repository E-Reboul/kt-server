import { Request, Response } from "express";
import AnswerService from "../services/AnswerService";

class AnswerController {

    private answerService: AnswerService;

    constructor() {
        this.answerService = new AnswerService();
    }

    public async getAllAnswers(req: Request, res: Response): Promise<void> {
        try {
            const answers = await this.answerService.getAll();
            res.status(200).json(answers);
        } catch (error) {
            console.error('Failed to retrieve all answers:', error);
            res.status(500).json({ message: 'Impossible de récupérer les réponses.' });
        }
    }

    public async getAnswerById(req: Request, res: Response): Promise<void> {
        const answerId = parseInt(req.params.id, 10);

        if (isNaN(answerId)) {
            res.status(400).json({ message: 'ID réponse invalide.' });
            return;
        }

        try {
            const answer = await this.answerService.getById(answerId);
            if (!answer) {
                res.status(404).json({ message: 'Réponse introuvable.' });
                return;
            }
            res.status(200).json(answer);
        } catch (error) {
            console.error('Failed to retrieve answer by ID:', error);
            res.status(500).json({ message: 'Impossible de récupérer la réponse.' });
        }
    }

    public async createAnswer(req: Request, res: Response): Promise<void> {
        const answerData = req.body;

        try {
            const createdResult = await this.answerService.create(answerData);
            if (!createdResult) {
                res.status(400).json({ message: 'Échec de la création de la réponse.' });
                return;
            }
            res.status(201).json({ message: 'Réponse créé avec succès.' });
        } catch (error) {
            console.error('Failed to create answer:', error);
            res.status(500).json({ message: 'Impossible de créer la réponse.' });
        }
    }

    public async updateAnswer(req: Request, res: Response): Promise<void> {
        const answerId = parseInt(req.params.id, 10);

        if (isNaN(answerId)) {
            res.status(400).json({ message: 'ID réponse invalide.' });
            return;
        }

        const answerData = req.body;

        try {
            const updatedResult = await this.answerService.update(answerId, answerData);
            if (!updatedResult) {
                res.status(400).json({ message: 'Échec de la mise à jour de la réponse.' });
                return;
            }
            res.status(200).json({ message: 'Réponse mis à jour avec succès.' });
        } catch (error) {
            console.error('Failed to update answer:', error);
            res.status(500).json({ message: 'Impossible de mettre à jour la réponse.' });
        }
    }

    public async deleteAnswer(req: Request, res: Response): Promise<void> {
        const answerId = parseInt(req.params.id, 10);
        
        if (isNaN(answerId)) {
            res.status(400).json({ message: 'ID réponse invalide.' });
            return;
        }

        try {
            const deletedResult = await this.answerService.delete(answerId);
            if (!deletedResult) {
                res.status(400).json({ message: 'Échec de la suppression de la réponse.' });
                return;
            }
            res.status(200).json({ message: 'Réponse supprimé avec succès.' });
        } catch (error) {
            console.error('Failed to delete answer:', error);
            res.status(500).json({ message: 'Impossible de supprimer la réponse.' });
        }
    }

    public async getAnswersByQuizz(req: Request, res: Response): Promise<void> {
        const quizzId = parseInt(req.params.id, 10);

        if (isNaN(quizzId)) {
            res.status(400).json({ message: 'ID quizz invalide.' });
            return;
        }

        try {
            const answers = await this.answerService.getAnswersByQuizz(quizzId);
            res.status(200).json(answers);
        } catch (error) {
            console.error('Failed to retrieve all answers:', error);
            res.status(500).json({ message: 'Impossible de récupérer les réponses.' });
        }
    }

    public async getAnswersByQuestion(req: Request, res: Response): Promise<void> {
        const questionId = parseInt(req.params.id, 10);

        if (isNaN(questionId)) {
            res.status(400).json({ message: 'ID question invalide.' });
            return;
        }

        try {
            const answers = await this.answerService.getAnswersByQuestion(questionId);
            res.status(200).json(answers);
        } catch (error) {
            console.error('Failed to retrieve all answers:', error);
            res.status(500).json({ message: 'Impossible de récupérer les réponses.' });
        }
    }
}

export default AnswerController;