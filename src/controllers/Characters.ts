import { Request, Response } from "express";
import CharactersService from "../services/Characters";

class CharactersController {

    private charactersService: CharactersService;

    constructor() {
        this.charactersService = new CharactersService();
    }

    public async getAllCharacters(req: Request, res: Response): Promise<void> {
        try {
            const characters = await this.charactersService.getAll();
            res.status(200).json(characters);
        } catch (error) {
            console.error('Failed to retrieve all characters:', error);
            res.status(500).json({ message: 'Impossible de récupérer les personnages.' });
        }
    }

    public async getCharacterById(req: Request, res: Response): Promise<void> {
        const characterId = parseInt(req.params.id, 10);
        if (isNaN(characterId)) {
            res.status(400).json({ message: 'ID personnage invalide.' });
            return;
        }

        try {
            const character = await this.charactersService.getById(characterId);
            if (!character) {
                res.status(404).json({ message: 'Personnage introuvable.' });
                return;
            }
            res.status(200).json(character);
        } catch (error) {
            console.error('Failed to retrieve character by ID:', error);
            res.status(500).json({ message: 'Impossible de récupérer le personnage.' });
        }
    }

    public async createCharacter(req: Request, res: Response): Promise<void> {
        const characterData = req.body;

        try {
            const created = await this.charactersService.create(characterData);
            if (!created) {
                res.status(400).json({ message: 'Échec de la création du personnage.' });
                return;
            }
            res.status(201).json({ message: 'Personnage créé avec succès.' });
        } catch (error) {
            console.error('Failed to create character:', error);
            res.status(500).json({ message: 'Impossible de créer le personnage.' });
        }
    }

    public async updateCharacter(req: Request, res: Response): Promise<void> {
        const characterId = parseInt(req.params.id, 10);
        if (isNaN(characterId)) {
            res.status(400).json({ message: 'ID personnage invalide.' });
            return;
        }

        const characterData = req.body;

        try {
            const updated = await this.charactersService.update(characterId, characterData);
            if (!updated) {
                res.status(400).json({ message: 'Échec de la mise à jour du personnage.' });
                return;
            }
            res.status(200).json({ message: 'Personnage mis à jour avec succès.' });
        } catch (error) {
            console.error('Failed to update character:', error);
            res.status(500).json({ message: 'Impossible de mettre à jour le personnage.' });
        }
    }

    public async deleteCharacter(req: Request, res: Response): Promise<void> {
        const characterId = parseInt(req.params.id, 10);
        if (isNaN(characterId)) {
            res.status(400).json({ message: 'ID personnage invalide.' });
            return;
        }

        try {
            const deleted = await this.charactersService.delete(characterId);
            if (!deleted) {
                res.status(400).json({ message: 'Échec de la suppression du personnage.' });
                return;
            }
            res.status(200).json({ message: 'Personnage supprimé avec succès.' });
        } catch (error) {
            console.error('Failed to delete character:', error);
            res.status(500).json({ message: 'Impossible de supprimer le personnage.' });
        }
    }
}

export default CharactersController;
