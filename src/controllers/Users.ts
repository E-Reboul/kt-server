import { Request, Response } from "express";
import UsersService from "../services/Users";

class UsersController {

    private usersService: UsersService;

    constructor() {
        this.usersService = new UsersService();
    }

    public async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.usersService.getAll();
            res.status(200).json(users);
        } catch (error) {
            console.error('Failed to retrieve all users:', error);
            res.status(500).json({ message: 'Impossible de récupérer les utilisateurs.' });
        }
    }

    public async getUserById(req: Request, res: Response): Promise<void> {
        const userId = parseInt(req.params.id, 10);
        if (isNaN(userId)) {
            res.status(400).json({ message: 'ID utilisateur invalide.' });
            return;
        }

        try {
            const user = await this.usersService.getById(userId);
            if (!user) {
                res.status(404).json({ message: 'Utilisateur introuvable.' });
                return;
            }
            res.status(200).json(user);
        } catch (error) {
            console.error('Failed to retrieve user by ID:', error);
            res.status(500).json({ message: 'Impossible de récupérer l\'utilisateur.' });
        }
    }

    public async createUser(req: Request, res: Response): Promise<void> {
        const userData = req.body;

        try {
            const created = await this.usersService.create(userData);
            if (!created) {
                res.status(400).json({ message: 'Échec de la création de l\'utilisateur.' });
                return;
            }
            res.status(201).json({ message: 'Utilisateur créé avec succès.' });
        } catch (error) {
            console.error('Failed to create user:', error);
            res.status(500).json({ message: 'Impossible de créer l\'utilisateur.' });
        }
    }

    public async updateUser(req: Request, res: Response): Promise<void> {
        const userId = parseInt(req.params.id, 10);
        if (isNaN(userId)) {
            res.status(400).json({ message: 'ID utilisateur invalide.' });
            return;
        }

        const userData = req.body;

        try {
            const updated = await this.usersService.update(userId, userData);
            if (!updated) {
                res.status(400).json({ message: 'Échec de la mise à jour de l\'utilisateur.' });
                return;
            }
            res.status(200).json({ message: 'Utilisateur mis à jour avec succès.' });
        } catch (error) {
            console.error('Failed to update user:', error);
            res.status(500).json({ message: 'Impossible de mettre à jour l\'utilisateur.' });
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<void> {
        const userId = parseInt(req.params.id, 10);
        if (isNaN(userId)) {
            res.status(400).json({ message: 'ID utilisateur invalide.' });
            return;
        }

        try {
            const deleted = await this.usersService.delete(userId);
            if (!deleted) {
                res.status(400).json({ message: 'Échec de la suppression de l\'utilisateur.' });
                return;
            }
            res.status(200).json({ message: 'Utilisateur supprimé avec succès.' });
        } catch (error) {
            console.error('Failed to delete user:', error);
            res.status(500).json({ message: 'Impossible de supprimer l\'utilisateur.' });
        }
    }
}

export default UsersController;