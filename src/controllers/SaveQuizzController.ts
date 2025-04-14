import { Request, Response } from "express";
import SaveQuizzService from "../services/SaveQuizzService";

class SaveQuizzController {

    private saveQuizzService: SaveQuizzService;

    constructor() {
        this.saveQuizzService = new SaveQuizzService();
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            const rows = await this.saveQuizzService.getAll();
            if (rows.length === 0) {
                res.status(404).json({ message: "No quiz saves found" });
                return;
            }
            res.status(200).json(rows);
        } catch (e) {
            console.error("Error in getAll:", e);
            res.status(500).json({ message: "Error while retrieving quiz saves" });
        }
    }

    public async getById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res.status(400).json({ message: "Invalid quiz save ID" });
                return;
            }
            const saveQuizz = await this.saveQuizzService.getById(id);
            if (!saveQuizz) {
                res.status(404).json({ message: "Quiz save not found" });
                return;
            }
            res.status(200).json(saveQuizz);
        } catch (e) {
            console.error("Error in getById:", e);
            res.status(500).json({ message: `Error while retrieving quiz save with ID ${req.params.id}` });
        }
    }

    public async create(req: Request, res: Response): Promise<void> {
        try {
            const saveQuizz = req.body;
            if (!saveQuizz.id_user || !saveQuizz.id_quizz || !saveQuizz.id_character) {
                res.status(400).json({ message: "Incomplete quiz save data" });
                return;
            }
            const created = await this.saveQuizzService.create(saveQuizz);
            if (!created) {
                res.status(500).json({ message: "Error while creating quiz save" });
                return;
            }
            res.status(201).json({ message: "Quiz save created successfully" });
        } catch (e) {
            console.error("Error in create:", e);
            res.status(500).json({ message: "Error while creating quiz save" });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id, 10);
            const id_user = parseInt(req.params.id_user, 10);
            const id_quizz = parseInt(req.params.id_quizz, 10);
            
            if (isNaN(id) || isNaN(id_user) || isNaN(id_quizz)) {
                res.status(400).json({ message: "Invalid quiz save ID" });
                return;
            }
            const saveQuizz = req.body;
            const updated = await this.saveQuizzService.update(id, id_user, id_quizz, saveQuizz);
            if (!updated) {
                res.status(500).json({ message: "Error while updating quiz save" });
                return;
            }
            res.status(200).json({ message: "Quiz save updated successfully" });
        } catch (e) {
            console.error("Error in update:", e);
            res.status(500).json({ message: `Error while updating quiz save with ID ${req.params.id}` });
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res.status(400).json({ message: "Invalid quiz save ID" });
                return;
            }
            const deleted = await this.saveQuizzService.delete(id);
            if (!deleted) {
                res.status(500).json({ message: "Error while deleting quiz save" });
                return;
            }
            res.status(200).json({ message: "Quiz save deleted successfully" });
        } catch (e) {
            console.error("Error in delete:", e);
            res.status(500).json({ message: `Error while deleting quiz save with ID ${req.params.id}` });
        }
    }
}

export default SaveQuizzController;