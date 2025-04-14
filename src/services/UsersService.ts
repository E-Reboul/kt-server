import Users from "../models/Users";
import UsersRepository from "../repositories/UsersRepository";

class UsersService {

    private userRepository: UsersRepository;

    constructor() {
        this.userRepository = new UsersRepository();
    }

    public async getAll(): Promise<Users[]> {
        try {
            const rows = await this.userRepository.getAll();
            if (rows.length === 0) return [];

            return rows;
        } catch(e) {
            console.error("Error in getAll:", e);
            throw new Error("Erreur lors de la récupération des utilisateurs");
        }
    }

    public async getById(id: number): Promise<Users | null> {
        try {
            const user = await this.userRepository.getById(id);
            if (!user) throw new Error("Utilisateur non trouvé");

            return user;
        } catch(e) {
            console.error("Error in getById:", e);
            throw new Error(`Erreur lors de la récupération de l'utilisateur avec ID ${id}`);
        }
    }

    public async create(user: Partial<Users>): Promise<boolean> {
        try {

            if (!user.username?.trim() || !user.password?.trim() || !user.password_kids?.trim() || !user.email?.trim()) throw new Error("Données utilisateur incomplètes");

            const created = await this.userRepository.create(user);

            if (!created) throw new Error("Erreur lors de la création de l'utilisateur");

            return created;
        } catch(e) {
            console.error("Error in create:", e);
            throw new Error("Erreur lors de la création de l'utilisateur");
        }
    }

    public async update(id: number, user: Partial<Users>): Promise<boolean> {
        try {

            if (!id || isNaN(id)) {
                throw new Error("ID utilisateur invalide");
            }

            const updated = await this.userRepository.update(id, user);
            
            if (!updated) throw new Error("Erreur lors de la mise à jour de l'utilisateur");

            return updated;
        } catch(e) {
            console.error("Error in update:", e);
            throw new Error("Erreur lors de la mise à jour de l'utilisateur");
        }
    }

    public async delete(id: number): Promise<boolean> {
        try {

            if (!id || isNaN(id)) {
                throw new Error("ID utilisateur invalide");
            }

            const deleted = await this.userRepository.delete(id);

            if (!deleted) throw new Error("Erreur lors de la suppression de l'utilisateur");

            return deleted;
        } catch(e) {
            console.error("Error in delete:", e);
            throw new Error("Erreur lors de la suppression de l'utilisateur");
        }
    }
}

export default UsersService;