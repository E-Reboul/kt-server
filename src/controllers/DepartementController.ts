import { Request, Response } from "express";
import DepartementService from "../services/DepartementService";

class DepartementController {

    private departementService: DepartementService;

    constructor() {
        this.departementService = new DepartementService();
    }

    public async getAllDepartements(req: Request, res: Response): Promise<void> {
        try {
            const departements = await this.departementService.getAll();
            res.status(200).json(departements);
        } catch (error) {
            console.error('Failed to retrieve all departements:', error);
            res.status(500).json({ message: 'Impossible de récupérer les départements.' });
        }
    }

    public async getDepartementById(req: Request, res: Response): Promise<void> {
        const departementId = parseInt(req.params.id, 10);
        if (isNaN(departementId)) {
            res.status(400).json({ message: 'ID département invalide.' });
            return;
        }

        try {
            const departement = await this.departementService.getById(departementId);
            if (!departement) {
                res.status(404).json({ message: 'Département introuvable.' });
                return;
            }
            res.status(200).json(departement);
        } catch (error) {
            console.error('Failed to retrieve departement by ID:', error);
            res.status(500).json({ message: 'Impossible de récupérer le département.' });
        }
    }

    public async getDepartementByNumber(req: Request, res: Response): Promise<void> {
        const departementNumber = req.params.number;
        if (!departementNumber) {
            res.status(400).json({ message: 'Numéro de département invalide.' });
            return;
        }

        try {
            const departement = await this.departementService.getByDepartementNumber(departementNumber);
            if (!departement) {
                res.status(404).json({ message: 'Département introuvable.' });
                return;
            }
            res.status(200).json(departement);
        } catch (error) {
            console.error('Failed to retrieve departement by number:', error);
            res.status(500).json({ message: 'Impossible de récupérer le département.' });
        }
    }

    public async createDepartement(req: Request, res: Response): Promise<void> {
        const departementData = req.body;

        try {
            const created = await this.departementService.create(departementData);
            if (!created) {
                res.status(400).json({ message: 'Échec de la création du département.' });
                return;
            }
            res.status(201).json({ message: 'Département créé avec succès.' });
        } catch (error) {
            console.error('Failed to create departement:', error);
            res.status(500).json({ message: 'Impossible de créer le département.' });
        }
    }

    public async updateDepartement(req: Request, res: Response): Promise<void> {
        const departementId = parseInt(req.params.id, 10);
        if (isNaN(departementId)) {
            res.status(400).json({ message: 'ID département invalide.' });
            return;
        }

        const departementData = req.body;

        try {
            const updated = await this.departementService.update(departementId, departementData);
            if (!updated) {
                res.status(400).json({ message: 'Échec de la mise à jour du département.' });
                return;
            }
            res.status(200).json({ message: 'Département mis à jour avec succès.' });
        } catch (error) {
            console.error('Failed to update departement:', error);
            res.status(500).json({ message: 'Impossible de mettre à jour le département.' });
        }
    }

    public async deleteDepartement(req: Request, res: Response): Promise<void> {
        const departementId = parseInt(req.params.id, 10);
        if (isNaN(departementId)) {
            res.status(400).json({ message: 'ID département invalide.' });
            return;
        }

        try {
            const deleted = await this.departementService.delete(departementId);
            if (!deleted) {
                res.status(400).json({ message: 'Échec de la suppression du département.' });
                return;
            }
            res.status(200).json({ message: 'Département supprimé avec succès.' });
        } catch (error) {
            console.error('Failed to delete departement:', error);
            res.status(500).json({ message: 'Impossible de supprimer le département.' });
        }
    }
}

export default DepartementController;