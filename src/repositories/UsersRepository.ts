import Users from "../models/Users";
import executeQuery from "../utils/executeQuery";

class UsersRepository {
  constructor() {}

  public async getAll(): Promise<Users[]> {
    const rows = await executeQuery("SELECT * FROM users", []);
    return rows.map((row: object) => new Users(row));
  }

  public async getById(id: number): Promise<Users | null> {
    const row = await executeQuery("SELECT * FROM users WHERE id = ?", [id]);
    if (row.length === 0) return null;
    return new Users(row[0]);
  }

  public async create(user: Partial<Users>): Promise<boolean> {
    const newUser = user;
    const result = await executeQuery("INSERT INTO users SET ?", [newUser]);
    return result.affectedRows > 0;
  }

  public async update(id: number, user: Partial<Users>): Promise<boolean> {
		const userId = id;
		const updatedUser = user;
    const result = await executeQuery("UPDATE users SET ? WHERE id = ?", [
			updatedUser,
      userId,
    ]);
    return result.affectedRows > 0;
  }

  public async delete(id: number): Promise<boolean> {
    const result = await executeQuery("DELETE FROM users WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}

export default UsersRepository;
