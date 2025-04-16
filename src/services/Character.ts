import Characters from "../models/Character";
import CharacterRepository from "../repositories/Character";

class CharactersService {

    private characterRepository: CharacterRepository;

    constructor() {
        this.characterRepository = new CharacterRepository();
    }

    public async getAll(): Promise<Characters[]> {
        try {
            const rows = await this.characterRepository.getAll();
            if (rows.length === 0) return [];
            return rows;
        } catch (e) {
            console.error("Error in getAll:", e);
            throw new Error("Erreur lors de la récupération des personnages");
        }
    }

    public async getById(id: number): Promise<Characters | null> {
        try {
            const character = await this.characterRepository.getById(id);
            if (!character) throw new Error("Personnage non trouvé");
            return character;
        } catch (e) {
            console.error("Error in getById:", e);
            throw new Error(`Erreur lors de la récupération du personnage avec ID ${id}`);
        }
    }

    public async create(character: Partial<Characters>): Promise<boolean> {
        try {
            if (
                !character.name?.trim() ||
                !character.image_url?.trim() ||
                !character.id_quiz
            ) {
                throw new Error("Données personnage incomplètes");
            }

            const created = await this.characterRepository.create(character);
            if (!created) throw new Error("Erreur lors de la création du personnage");

            return created;
        } catch (e) {
            console.error("Error in create:", e);
            throw new Error("Erreur lors de la création du personnage");
        }
    }

    public async update(id: number, character: Partial<Characters>): Promise<boolean> {
        try {
            if (!id || isNaN(id)) {
                throw new Error("ID personnage invalide");
            }

            const updated = await this.characterRepository.update(id, character);
            if (!updated) throw new Error("Erreur lors de la mise à jour du personnage");

            return updated;
        } catch (e) {
            console.error("Error in update:", e);
            throw new Error("Erreur lors de la mise à jour du personnage");
        }
    }

    public async delete(id: number): Promise<boolean> {
        try {
            if (!id || isNaN(id)) {
                throw new Error("ID personnage invalide");
            }

            const deleted = await this.characterRepository.delete(id);
            if (!deleted) throw new Error("Erreur lors de la suppression du personnage");

            return deleted;
        } catch (e) {
            console.error("Error in delete:", e);
            throw new Error("Erreur lors de la suppression du personnage");
        }
    }
}

export default CharactersService;
