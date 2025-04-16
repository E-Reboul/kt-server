import { Request, Response } from "express";
import OrganizationsService from "../services/Organization";

class OrganizationsController {

    private OrganizationsService: OrganizationsService;

    constructor() {
        this.OrganizationsService = new OrganizationsService();
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            const Organizations = await this.OrganizationsService.getAll();
            res.status(200).json(Organizations);
        } catch (error) {
            console.error('Failed to retrieve all Organizations:', error);
            res.status(500).json({ message: 'Impossible de récupérer les Organizations.' });
        }
    }

    public async getById(req: Request, res: Response): Promise<void> {
        const OrganizationId = parseInt(req.params.id, 10);
        if (isNaN(OrganizationId)) {
            res.status(400).json({ message: 'ID Organization invalide.' });
            return;
        }

        try {
            const Organization = await this.OrganizationsService.getById(OrganizationId);
            if (!Organization) {
                res.status(404).json({ message: 'Organization introuvable.' });
                return;
            }
            res.status(200).json(Organization);
        } catch (error) {
            console.error('Failed to retrieve Organization by ID:', error);
            res.status(500).json({ message: 'Impossible de récupérer l\'Organization.' });
        }
    }

    public async create(req: Request, res: Response): Promise<void> {
        const OrganizationData = req.body;

        try {
            const created = await this.OrganizationsService.create(OrganizationData);
            if (!created) {
                res.status(400).json({ message: 'Échec de la création de l\'Organization.' });
                return;
            }
            res.status(201).json({ message: 'Organization créée avec succès.' });
        } catch (error) {
            console.error('Failed to create Organization:', error);
            res.status(500).json({ message: 'Impossible de créer l\'Organization.' });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const OrganizationId = parseInt(req.params.id, 10);
        if (isNaN(OrganizationId)) {
            res.status(400).json({ message: 'ID Organization invalide.' });
            return;
        }

        const OrganizationData = req.body;

        try {
            const updated = await this.OrganizationsService.update(OrganizationId, OrganizationData);
            if (!updated) {
                res.status(400).json({ message: 'Échec de la mise à jour de l\'Organization.' });
                return;
            }
            res.status(200).json({ message: 'Organization mise à jour avec succès.' });
        } catch (error) {
            console.error('Failed to update Organization:', error);
            res.status(500).json({ message: 'Impossible de mettre à jour l\'Organization.' });
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const OrganizationId = parseInt(req.params.id, 10);
        if (isNaN(OrganizationId)) {
            res.status(400).json({ message: 'ID Organization invalide.' });
            return;
        }

        try {
            const deleted = await this.OrganizationsService.delete(OrganizationId);
            if (!deleted) {
                res.status(400).json({ message: 'Échec de la suppression de l\'Organization.' });
                return;
            }
            res.status(200).json({ message: 'Organization supprimée avec succès.' });
        } catch (error) {
            console.error('Failed to delete Organization:', error);
            res.status(500).json({ message: 'Impossible de supprimer l\'Organization.' });
        }
    }
}

export default OrganizationsController;
