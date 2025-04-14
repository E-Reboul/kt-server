import SaveQuizz from "../models/SaveQuizz.js";
import SaveQuizzRepository from "../repositories/SaveQuizzRepository.ts";

class SaveQuizzService {

    private saveQuizzRepository: SaveQuizzRepository;

    constructor() {
        this.saveQuizzRepository = new SaveQuizzRepository();
    }

    public async getAll(): Promise<SaveQuizz[]> {
        try {
            const rows = await this.saveQuizzRepository.getAll();
            if (rows.length === 0) return [];

            return rows;
        } catch(e) {
            console.error("Error in getAll:", e);
            throw new Error("Error while retrieving quiz saves");
        }
    }

    public async getById(id: number): Promise<SaveQuizz | null> {
        try {

            if (!id || isNaN(id)) {
                throw new Error("Invalid user ID");
            }

            const saveQuizz = await this.saveQuizzRepository.getById(id);

            if (!saveQuizz) throw new Error("Quiz save not found");

            return saveQuizz;
        } catch(e) {
            console.error("Error in getById:", e);
            throw new Error(`Error while retrieving quiz save with ID ${id}`);
        }
    }

    public async create(saveQuizz: Partial<SaveQuizz>): Promise<boolean> {
        try {

            if (!saveQuizz.id_user || !saveQuizz.id_quizz || !saveQuizz.id_character) throw new Error("Incomplete quiz save data");

            const created = await this.saveQuizzRepository.create(saveQuizz);

            if (!created) throw new Error("Error while creating quiz save");

            return created;
        } catch(e) {
            console.error("Error in create:", e);
            throw new Error("Error while creating quiz save");
        }
    }

    public async update(id: number, id_user: number, id_quizz: number, saveQuizz: Partial<SaveQuizz>): Promise<boolean> {
        try {

            if (!id || isNaN(id)) {
                throw new Error("Invalid quiz save ID");
            }

            const updated = await this.saveQuizzRepository.update(id, id_user, id_quizz, saveQuizz);

            if (!updated) throw new Error("Error while updating quiz save");

            return updated;
        } catch(e) {
            console.error("Error in update:", e);
            throw new Error(`Error while updating quiz save with ID ${id}`);
        }
    }

    public async delete(id: number): Promise<boolean> {
        try {

            if (!id || isNaN(id)) {
                throw new Error("Invalid quiz save ID");
            }

            const deleted = await this.saveQuizzRepository.delete(id);

            if (!deleted) throw new Error("Error while deleting quiz save");

            return deleted;
        } catch(e) {
            console.error("Error in delete:", e);
            throw new Error("Error while deleting quiz save");
        }
    }
}

export default SaveQuizzService;