import Organizations from "../models/Organization";
import OrganizationRepository from "../repositories/Organization";

class OrganizationsService {

    private OrganizationRepository: OrganizationRepository;

    constructor() {
        this.OrganizationRepository = new OrganizationRepository();
    }

    public async getAll(): Promise<Organizations[]> {
        try {
            const rows = await this.OrganizationRepository.getAll();
            if (rows.length === 0) return [];

            return rows;
        } catch(e) {
            console.error("Error in getAll:", e);
            throw new Error("Erreur lors de la récupération des Organizations");
        }
    }

    public async getById(id: number): Promise<Organizations | null> {
        try {
            const Organization = await this.OrganizationRepository.getById(id);
            if (!Organization) throw new Error("Organization non trouvée");

            return Organization;
        } catch(e) {
            console.error("Error in getById:", e);
            throw new Error(`Erreur lors de la récupération de l'Organization avec ID ${id}`);
        }
    }

    public async create(Organization: Partial<Organizations>): Promise<boolean> {
        try {
            if (
                !Organization.name?.trim() ||
                !Organization.email?.trim() ||
                !Organization.phone_number?.trim() ||
                !Organization.about_us?.trim()
            ) {
                throw new Error("Données Organization incomplètes");
            }

            const created = await this.OrganizationRepository.create(Organization);

            if (!created) throw new Error("Erreur lors de la création de l'Organization");

            return created;
        } catch(e) {
            console.error("Error in create:", e);
            throw new Error("Erreur lors de la création de l'Organization");
        }
    }

    public async update(id: number, Organization: Partial<Organizations>): Promise<boolean> {
        try {
            if (!id || isNaN(id)) {
                throw new Error("ID Organization invalide");
            }

            const updated = await this.OrganizationRepository.update(id, Organization);
            
            if (!updated) throw new Error("Erreur lors de la mise à jour de l'Organization");

            return updated;
        } catch(e) {
            console.error("Error in update:", e);
            throw new Error("Erreur lors de la mise à jour de l'Organization");
        }
    }

    public async delete(id: number): Promise<boolean> {
        try {
            if (!id || isNaN(id)) {
                throw new Error("ID Organization invalide");
            }

            const deleted = await this.OrganizationRepository.delete(id);

            if (!deleted) throw new Error("Erreur lors de la suppression de l'Organization");

            return deleted;
        } catch(e) {
            console.error("Error in delete:", e);
            throw new Error("Erreur lors de la suppression de l'Organization");
        }
    }
}

export default OrganizationsService;
