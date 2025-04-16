import Organizations from "../models/Organization";
import executeQuery from "../utils/executeQuery";

class OrganizationRepository {
  constructor() {}

  public async getAll(): Promise<Organizations[]> {
    const rows = await executeQuery("SELECT * FROM Organizations", []);
    return rows.map((row: object) => new Organizations(row));
  }

  public async getById(id: number): Promise<Organizations | null> {
    const row = await executeQuery("SELECT * FROM Organizations WHERE id = ?", [id]);
    if (row.length === 0) return null;
    return new Organizations(row[0]);
  }

  public async create(orga: Partial<Organizations>): Promise<boolean> {
    const result = await executeQuery("INSERT INTO Organizations SET ?", [orga]);
    return result.affectedRows > 0;
  }

  public async update(id: number, orga: Partial<Organizations>): Promise<boolean> {
    const result = await executeQuery("UPDATE Organizations SET ? WHERE id = ?", [
      orga,
      id,
    ]);
    return result.affectedRows > 0;
  }

  public async delete(id: number): Promise<boolean> {
    const result = await executeQuery("DELETE FROM Organizations WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}

export default OrganizationRepository;
