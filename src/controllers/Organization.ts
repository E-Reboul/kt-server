import { Request, Response } from "express";
import OrganisationsService from "../services/Organization";

class OrganisationsController {

    private organisationsService: OrganisationsService;

    constructor() {
        this.organisationsService = new OrganisationsService();
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            const organisations = await this.organisationsService.getAll();
            res.status(200).json(organisations);
        } catch (error) {
            console.error('Failed to retrieve all organisations:', error);
            res.status(500).json({ message: 'Impossible de récupérer les organisations.' });
        }
    }

    public async getById(req: Request, res: Response): Promise<void> {
        const organisationId = parseInt(req.params.id, 10);
        if (isNaN(organisationId)) {
            res.status(400).json({ message: 'ID organisation invalide.' });
            return;
        }

        try {
            const organisation = await this.organisationsService.getById(organisationId);
            if (!organisation) {
                res.status(404).json({ message: 'Organisation introuvable.' });
                return;
            }
            res.status(200).json(organisation);
        } catch (error) {
            console.error('Failed to retrieve organisation by ID:', error);
            res.status(500).json({ message: 'Impossible de récupérer l\'organisation.' });
        }
    }

    public async create(req: Request, res: Response): Promise<void> {
        const organisationData = req.body;

        try {
            const created = await this.organisationsService.create(organisationData);
            if (!created) {
                res.status(400).json({ message: 'Échec de la création de l\'organisation.' });
                return;
            }
            res.status(201).json({ message: 'Organisation créée avec succès.' });
        } catch (error) {
            console.error('Failed to create organisation:', error);
            res.status(500).json({ message: 'Impossible de créer l\'organisation.' });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const organisationId = parseInt(req.params.id, 10);
        if (isNaN(organisationId)) {
            res.status(400).json({ message: 'ID organisation invalide.' });
            return;
        }

        const organisationData = req.body;

        try {
            const updated = await this.organisationsService.update(organisationId, organisationData);
            if (!updated) {
                res.status(400).json({ message: 'Échec de la mise à jour de l\'organisation.' });
                return;
            }
            res.status(200).json({ message: 'Organisation mise à jour avec succès.' });
        } catch (error) {
            console.error('Failed to update organisation:', error);
            res.status(500).json({ message: 'Impossible de mettre à jour l\'organisation.' });
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const organisationId = parseInt(req.params.id, 10);
        if (isNaN(organisationId)) {
            res.status(400).json({ message: 'ID organisation invalide.' });
            return;
        }

        try {
            const deleted = await this.organisationsService.delete(organisationId);
            if (!deleted) {
                res.status(400).json({ message: 'Échec de la suppression de l\'organisation.' });
                return;
            }
            res.status(200).json({ message: 'Organisation supprimée avec succès.' });
        } catch (error) {
            console.error('Failed to delete organisation:', error);
            res.status(500).json({ message: 'Impossible de supprimer l\'organisation.' });
        }
    }
}

export default OrganisationsController;
