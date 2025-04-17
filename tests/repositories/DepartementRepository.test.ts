import DepartementRepository from '../../src/repositories/DepartementRepository';
import Departement from '../../src/models/Departement';
import * as executeQueryModule from '../../src/utils/executeQuery';

// Mock de executeQuery
jest.mock('../../src/utils/executeQuery');
const mockExecuteQuery = executeQueryModule.default as jest.MockedFunction<typeof executeQueryModule.default>;

describe('DepartementRepository', () => {
  let departementRepository: DepartementRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    departementRepository = new DepartementRepository();
  });

  describe('getAll', () => {
    test('devrait retourner un tableau de départements', async () => {
      // Arrange
      const mockRows = [
        { id: 1, name: 'Paris', departement_number: '75' },
        { id: 2, name: 'Rhône', departement_number: '69' }
      ];
      mockExecuteQuery.mockResolvedValue(mockRows);

      // Act
      const result = await departementRepository.getAll();

      // Assert
      expect(mockExecuteQuery).toHaveBeenCalledWith('SELECT * FROM departement', []);
      expect(result.length).toBe(2);
      expect(result[0]).toBeInstanceOf(Departement);
      expect(result[0].getId()).toBe(1);
      expect(result[0].getName()).toBe('Paris');
      expect(result[1].getDepartementNumber()).toBe('69');
    });

    test('devrait retourner un tableau vide quand aucun département trouvé', async () => {
      // Arrange
      mockExecuteQuery.mockResolvedValue([]);

      // Act
      const result = await departementRepository.getAll();

      // Assert
      expect(mockExecuteQuery).toHaveBeenCalledWith('SELECT * FROM departement', []);
      expect(result).toEqual([]);
      expect(result.length).toBe(0);
    });
  });

  describe('getById', () => {
    test('devrait retourner un département quand ID existe', async () => {
      // Arrange
      const departementId = 1;
      const mockRow = [{ id: departementId, name: 'Paris', departement_number: '75' }];
      mockExecuteQuery.mockResolvedValue(mockRow);

      // Act
      const result = await departementRepository.getById(departementId);

      // Assert
      expect(mockExecuteQuery).toHaveBeenCalledWith('SELECT * FROM departement WHERE id = ?', [departementId]);
      expect(result).toBeInstanceOf(Departement);
      expect(result?.getId()).toBe(departementId);
      expect(result?.getName()).toBe('Paris');
    });

    test('devrait retourner null quand ID n\'existe pas', async () => {
      // Arrange
      const departementId = 999;
      mockExecuteQuery.mockResolvedValue([]);

      // Act
      const result = await departementRepository.getById(departementId);

      // Assert
      expect(mockExecuteQuery).toHaveBeenCalledWith('SELECT * FROM departement WHERE id = ?', [departementId]);
      expect(result).toBeNull();
    });
  });

  describe('getByDepartementNumber', () => {
    test('devrait retourner un département quand numéro existe', async () => {
      // Arrange
      const departementNumber = '75';
      const mockRow = [{ id: 1, name: 'Paris', departement_number: departementNumber }];
      mockExecuteQuery.mockResolvedValue(mockRow);

      // Act
      const result = await departementRepository.getByDepartementNumber(departementNumber);

      // Assert
      expect(mockExecuteQuery).toHaveBeenCalledWith('SELECT * FROM departement WHERE departement_number = ?', [departementNumber]);
      expect(result).toBeInstanceOf(Departement);
      expect(result?.getDepartementNumber()).toBe(departementNumber);
    });

    test('devrait retourner null quand numéro n\'existe pas', async () => {
      // Arrange
      const departementNumber = '99';
      mockExecuteQuery.mockResolvedValue([]);

      // Act
      const result = await departementRepository.getByDepartementNumber(departementNumber);

      // Assert
      expect(mockExecuteQuery).toHaveBeenCalledWith('SELECT * FROM departement WHERE departement_number = ?', [departementNumber]);
      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    test('devrait créer un département et retourner true quand création réussie', async () => {
      // Arrange
      const newDepartement = {
        name: 'Alpes-Maritimes',
        departement_number: '06'
      };
      mockExecuteQuery.mockResolvedValue({ affectedRows: 1 });

      // Act
      const result = await departementRepository.create(newDepartement);

      // Assert
      expect(mockExecuteQuery).toHaveBeenCalledWith('INSERT INTO departement SET ?', [newDepartement]);
      expect(result).toBe(true);
    });

    test('devrait retourner false quand création échoue', async () => {
      // Arrange
      const newDepartement = {
        name: 'Alpes-Maritimes',
        departement_number: '06'
      };
      mockExecuteQuery.mockResolvedValue({ affectedRows: 0 });

      // Act
      const result = await departementRepository.create(newDepartement);

      // Assert
      expect(mockExecuteQuery).toHaveBeenCalledWith('INSERT INTO departement SET ?', [newDepartement]);
      expect(result).toBe(false);
    });
  });

  describe('update', () => {
    test('devrait mettre à jour un département et retourner true quand mise à jour réussie', async () => {
      // Arrange
      const departementId = 1;
      const updatedDepartement = {
        name: 'Paris (Mise à jour)',
        departement_number: '75'
      };
      mockExecuteQuery.mockResolvedValue({ affectedRows: 1 });

      // Act
      const result = await departementRepository.update(departementId, updatedDepartement);

      // Assert
      expect(mockExecuteQuery).toHaveBeenCalledWith('UPDATE departement SET ? WHERE id = ?', [
        updatedDepartement,
        departementId
      ]);
      expect(result).toBe(true);
    });

    test('devrait retourner false quand aucun département n\'est mis à jour', async () => {
      // Arrange
      const departementId = 999;
      const updatedDepartement = {
        name: 'Paris (Mise à jour)',
        departement_number: '75'
      };
      mockExecuteQuery.mockResolvedValue({ affectedRows: 0 });

      // Act
      const result = await departementRepository.update(departementId, updatedDepartement);

      // Assert
      expect(mockExecuteQuery).toHaveBeenCalledWith('UPDATE departement SET ? WHERE id = ?', [
        updatedDepartement,
        departementId
      ]);
      expect(result).toBe(false);
    });
  });

  describe('delete', () => {
    test('devrait supprimer un département et retourner true quand suppression réussie', async () => {
      // Arrange
      const departementId = 1;
      mockExecuteQuery.mockResolvedValue({ affectedRows: 1 });

      // Act
      const result = await departementRepository.delete(departementId);

      // Assert
      expect(mockExecuteQuery).toHaveBeenCalledWith('DELETE FROM departement WHERE id = ?', [departementId]);
      expect(result).toBe(true);
    });

    test('devrait retourner false quand aucun département n\'est supprimé', async () => {
      // Arrange
      const departementId = 999;
      mockExecuteQuery.mockResolvedValue({ affectedRows: 0 });

      // Act
      const result = await departementRepository.delete(departementId);

      // Assert
      expect(mockExecuteQuery).toHaveBeenCalledWith('DELETE FROM departement WHERE id = ?', [departementId]);
      expect(result).toBe(false);
    });
  });

  describe('gestion d\'erreurs', () => {
    test('devrait propager les erreurs quand executeQuery échoue', async () => {
      // Arrange
      const error = new Error('Erreur de base de données');
      mockExecuteQuery.mockRejectedValue(error);

      // Act & Assert
      await expect(departementRepository.getAll()).rejects.toThrow('Erreur de base de données');
    });
  });
});