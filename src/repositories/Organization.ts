import Organisations from "../models/Organization";
import executeQuery from "../utils/executeQuery";

class OrganisationRepository {
  constructor() {}

  public async getAll(): Promise<Organisations[]> {
    const rows = await executeQuery("SELECT * FROM organisations", []);
    return rows.map((row: object) => new Organisations(row));
  }

  public async getById(id: number): Promise<Organisations | null> {
    const row = await executeQuery("SELECT * FROM organisations WHERE id = ?", [id]);
    if (row.length === 0) return null;
    return new Organisations(row[0]);
  }

  public async create(orga: Partial<Organisations>): Promise<boolean> {
    const result = await executeQuery("INSERT INTO organisations SET ?", [orga]);
    return result.affectedRows > 0;
  }

  public async update(id: number, orga: Partial<Organisations>): Promise<boolean> {
    const result = await executeQuery("UPDATE organisations SET ? WHERE id = ?", [
      orga,
      id,
    ]);
    return result.affectedRows > 0;
  }

  public async delete(id: number): Promise<boolean> {
    const result = await executeQuery("DELETE FROM organisations WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}

export default OrganisationRepository;
