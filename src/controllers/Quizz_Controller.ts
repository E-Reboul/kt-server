import { Request, Response } from "express";
import QuizzService from "../services/Quizz";

class QuizzController {

    private quizzService: QuizzService;

    constructor() {
        this.quizzService = new QuizzService();
    }

    public async getAllQuizzes(req: Request, res: Response): Promise<void> {
        try {
            const quizzes = await this.quizzService.getAll();
            res.status(200).json(quizzes);
        } catch (error) {
            console.error('Failed to retrieve all quizzes:', error);
            res.status(500).json({ message: 'Impossible de récupérer les quizz.' });
        }
    }

    public async getQuizzById(req: Request, res: Response): Promise<void> {
        const quizzId = parseInt(req.params.id, 10);
        if (isNaN(quizzId)) {
            res.status(400).json({ message: 'ID de quizz invalide.' });
            return;
        }

        try {
            const quizz = await this.quizzService.getById(quizzId);
            if (!quizz) {
                res.status(404).json({ message: 'Quizz introuvable.' });
                return;
            }
            res.status(200).json(quizz);
        } catch (error) {
            console.error('Failed to retrieve quizz by ID:', error);
            res.status(500).json({ message: 'Impossible de récupérer le quizz.' });
        }
    }

    public async createQuizz(req: Request, res: Response): Promise<void> {
        const quizzData = req.body;

        try {
            const created = await this.quizzService.create(quizzData);
            if (!created) {
                res.status(400).json({ message: 'Échec de la création du quizz.' });
                return;
            }
            res.status(201).json({ message: 'Quizz créé avec succès.' });
        } catch (error) {
            console.error('Failed to create quizz:', error);
            res.status(500).json({ message: 'Impossible de créer le quizz.' });
        }
    }

    public async updateQuizz(req: Request, res: Response): Promise<void> {
        const quizzId = parseInt(req.params.id, 10);
        if (isNaN(quizzId)) {
            res.status(400).json({ message: 'ID de quizz invalide.' });
            return;
        }

        const quizzData = req.body;

        try {
            const updated = await this.quizzService.update(quizzId, quizzData);
            if (!updated) {
                res.status(400).json({ message: 'Échec de la mise à jour du quizz.' });
                return;
            }
            res.status(200).json({ message: 'Quizz mis à jour avec succès.' });
        } catch (error) {
            console.error('Failed to update quizz:', error);
            res.status(500).json({ message: 'Impossible de mettre à jour le quizz.' });
        }
    }

    public async deleteQuizz(req: Request, res: Response): Promise<void> {
        const quizzId = parseInt(req.params.id, 10);
        if (isNaN(quizzId)) {
            res.status(400).json({ message: 'ID de quizz invalide.' });
            return;
        }

        try {
            const deleted = await this.quizzService.delete(quizzId);
            if (!deleted) {
                res.status(400).json({ message: 'Échec de la suppression du quizz.' });
                return;
            }
            res.status(200).json({ message: 'Quizz supprimé avec succès.' });
        } catch (error) {
            console.error('Failed to delete quizz:', error);
            res.status(500).json({ message: 'Impossible de supprimer le quizz.' });
        }
    }

    public async getQuizzesByUser(req: Request, res: Response): Promise<void> {
        const userId = parseInt(req.params.userId, 10);
        if (isNaN(userId)) {
            res.status(400).json({ message: 'ID utilisateur invalide.' });
            return;
        }

        try {
            const quizzes = await this.quizzService.getByUserId(userId);
            res.status(200).json(quizzes);
        } catch (error) {
            console.error('Failed to retrieve quizzes by user ID:', error);
            res.status(500).json({ message: 'Impossible de récupérer les quizz de l\'utilisateur.' });
        }
    }

    public async getQuizzesByDepartement(req: Request, res: Response): Promise<void> {
        const departementId = parseInt(req.params.departementId, 10);
        if (isNaN(departementId)) {
            res.status(400).json({ message: 'ID département invalide.' });
            return;
        }

        try {
            const quizzes = await this.quizzService.getByDepartementId(departementId);
            res.status(200).json(quizzes);
        } catch (error) {
            console.error('Failed to retrieve quizzes by departement ID:', error);
            res.status(500).json({ message: 'Impossible de récupérer les quizz du département.' });
        }
    }
}

export default QuizzController;