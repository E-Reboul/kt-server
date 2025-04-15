import Question from "../models/Question";
import executeQuery from "../utils/executeQuery";

class QuestionRepository {
  constructor() {}

  public async getAll(): Promise<Question[]> {
    const rows = await executeQuery("SELECT * FROM questions", []);
    return rows.map((row: object) => new Question(row));
  }

  public async getById(id: number): Promise<Question | null> {
    const row = await executeQuery("SELECT * FROM questions WHERE id = ?", [id]);
    if (row.length === 0) return null;
    return new Question(row[0]);
  }

  public async create(question: Partial<Question>): Promise<boolean> {
    const newQuestion = question;
    const result = await executeQuery("INSERT INTO questions SET ?", [newQuestion]);
    return result.affectedRows > 0;
  }

  public async update(id: number, question: Partial<Question>): Promise<boolean> {
		const questionId = id;
		const updatedQuestion = question;
    const result = await executeQuery("UPDATE questions SET ? WHERE id = ?", [
			updatedQuestion,
      questionId,
    ]);
    return result.affectedRows > 0;
  }

  public async delete(id: number): Promise<boolean> {
    const result = await executeQuery("DELETE FROM questions WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }

  public async filterQuestionsByQuizz(idQuizz: number): Promise<Question[]> {
    const rows = await executeQuery("SELECT * FROM questions WHERE id_quizz = ?", [idQuizz]);
    return rows.map((row: object) => new Question(row));
  }
}

export default QuestionRepository;
