import Organisations from "../models/Organization";
import OrganisationRepository from "../repositories/Organization";

class OrganisationsService {

    private organisationRepository: OrganisationRepository;

    constructor() {
        this.organisationRepository = new OrganisationRepository();
    }

    public async getAll(): Promise<Organisations[]> {
        try {
            const rows = await this.organisationRepository.getAll();
            if (rows.length === 0) return [];

            return rows;
        } catch(e) {
            console.error("Error in getAll:", e);
            throw new Error("Erreur lors de la récupération des organisations");
        }
    }

    public async getById(id: number): Promise<Organisations | null> {
        try {
            const organisation = await this.organisationRepository.getById(id);
            if (!organisation) throw new Error("Organisation non trouvée");

            return organisation;
        } catch(e) {
            console.error("Error in getById:", e);
            throw new Error(`Erreur lors de la récupération de l'organisation avec ID ${id}`);
        }
    }

    public async create(organisation: Partial<Organisations>): Promise<boolean> {
        try {
            if (
                !organisation.name?.trim() ||
                !organisation.email?.trim() ||
                !organisation.phone_number?.trim() ||
                !organisation.about_us?.trim()
            ) {
                throw new Error("Données organisation incomplètes");
            }

            const created = await this.organisationRepository.create(organisation);

            if (!created) throw new Error("Erreur lors de la création de l'organisation");

            return created;
        } catch(e) {
            console.error("Error in create:", e);
            throw new Error("Erreur lors de la création de l'organisation");
        }
    }

    public async update(id: number, organisation: Partial<Organisations>): Promise<boolean> {
        try {
            if (!id || isNaN(id)) {
                throw new Error("ID organisation invalide");
            }

            const updated = await this.organisationRepository.update(id, organisation);
            
            if (!updated) throw new Error("Erreur lors de la mise à jour de l'organisation");

            return updated;
        } catch(e) {
            console.error("Error in update:", e);
            throw new Error("Erreur lors de la mise à jour de l'organisation");
        }
    }

    public async delete(id: number): Promise<boolean> {
        try {
            if (!id || isNaN(id)) {
                throw new Error("ID organisation invalide");
            }

            const deleted = await this.organisationRepository.delete(id);

            if (!deleted) throw new Error("Erreur lors de la suppression de l'organisation");

            return deleted;
        } catch(e) {
            console.error("Error in delete:", e);
            throw new Error("Erreur lors de la suppression de l'organisation");
        }
    }
}

export default OrganisationsService;
