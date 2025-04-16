import Answer from "../models/Answer";
import executeQuery from "../utils/executeQuery";

class AnswerRepository {
  constructor() {}

  public async getAll(): Promise<Answer[]> {
    const rows = await executeQuery("SELECT * FROM answers", []);
    return rows.map((row: object) => new Answer(row));
  }

  public async getById(id: number): Promise<Answer | null> {
    const row = await executeQuery("SELECT * FROM answers WHERE id = ?", [id]);
    if (row.length === 0) return null;
    return new Answer(row[0]);
  }

  public async create(answer: Partial<Answer>): Promise<boolean> {
    const newAnswer = answer;
    const result = await executeQuery("INSERT INTO answers SET ?", [newAnswer]);
    return result.affectedRows > 0;
  }

  public async update(id: number, answer: Partial<Answer>): Promise<boolean> {
		const answerId = id;
		const updatedAnswer = answer;
    const result = await executeQuery("UPDATE answers SET ? WHERE id = ?", [
			updatedAnswer,
      answerId,
    ]);
    return result.affectedRows > 0;
  }

  public async delete(id: number): Promise<boolean> {
    const result = await executeQuery("DELETE FROM answers WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }

  public async getAnswersByQuizz(idQuizz: number): Promise<Answer[]> {
    const rows = await executeQuery("SELECT * FROM answers WHERE id_quizz = ?", [idQuizz]);
    return rows.map((row: object) => new Answer(row));
  }

  public async getAnswersByQuestion(idQuestion: number): Promise<Answer[]> {
    const rows = await executeQuery("SELECT * FROM answers WHERE id_question = ?", [idQuestion]);
    return rows.map((row: object) => new Answer(row));
  }
}

export default AnswerRepository;
