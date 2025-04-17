import { Request, Response } from 'express';
import DepartementController from '../../src/controllers/DepartementController';
import DepartementService from '../../src/services/DepartementService';
import Departement from '../../src/models/Departement';

// Mocks
jest.mock('../../src/configs/database');
jest.mock('../../src/services/DepartementService');

describe('DepartementController', () => {
  let departementController: DepartementController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockDepartementService: jest.Mocked<DepartementService>;

  beforeEach(() => {
    // Réinitialisation des mocks avant chaque test
    jest.clearAllMocks();
    
    // Mock de l'objet Response
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    
    // Mock du service
    mockDepartementService = new DepartementService() as jest.Mocked<DepartementService>;
    
    // Injecter le mock du service dans le contrôleur
    departementController = new DepartementController();
    // @ts-ignore - Accès à une propriété privée pour le test
    departementController.departementService = mockDepartementService;
  });

  // Tests pour getAllDepartements
  describe('getAllDepartements', () => {
    beforeEach(() => {
      mockRequest = {};
    });

    test('devrait retourner une liste de départements avec statut 200', async () => {
      // Arrange
      const mockDepartements = [
        { id: 1, name: 'Paris', departement_number: '75' },
        { id: 2, name: 'Rhône', departement_number: '69' }
      ] as Departement[];
      
      mockDepartementService.getAll = jest.fn().mockResolvedValue(mockDepartements);
      
      // Act
      await departementController.getAllDepartements(mockRequest as Request, mockResponse as Response);
      
      // Assert
      expect(mockDepartementService.getAll).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockDepartements);
    });

    test('devrait retourner une erreur 500 quand getAll échoue', async () => {
      // Arrange
      const error = new Error('Erreur de base de données');
      mockDepartementService.getAll = jest.fn().mockRejectedValue(error);
      
      // Act
      await departementController.getAllDepartements(mockRequest as Request, mockResponse as Response);
      
      // Assert
      expect(mockDepartementService.getAll).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ 
        message: 'Impossible de récupérer les départements.' 
      });
    });
  });

  // Tests pour getDepartementById
  describe('getDepartementById', () => {
    test('devrait retourner un département avec statut 200 quand ID valide', async () => {
      // Arrange
      mockRequest = {
        params: { id: '1' }
      };
      
      const mockDepartement = { 
        id: 1, 
        name: 'Paris', 
        departement_number: '75' 
      } as Departement;
      
      mockDepartementService.getById = jest.fn().mockResolvedValue(mockDepartement);
      
      // Act
      await departementController.getDepartementById(mockRequest as Request, mockResponse as Response);
      
      // Assert
      expect(mockDepartementService.getById).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockDepartement);
    });

    test('devrait retourner 400 quand ID invalide', async () => {
      // Arrange
      mockRequest = {
        params: { id: 'abc' }
      };
      
      // Act
      await departementController.getDepartementById(mockRequest as Request, mockResponse as Response);
      
      // Assert
      expect(mockDepartementService.getById).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ 
        message: 'ID département invalide.' 
      });
    });

    test('devrait retourner 404 quand département non trouvé', async () => {
      // Arrange
      mockRequest = {
        params: { id: '999' }
      };
      
      mockDepartementService.getById = jest.fn().mockResolvedValue(null);
      
      // Act
      await departementController.getDepartementById(mockRequest as Request, mockResponse as Response);
      
      // Assert
      expect(mockDepartementService.getById).toHaveBeenCalledWith(999);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ 
        message: 'Département introuvable.' 
      });
    });

    test('devrait retourner 500 quand service lance une erreur', async () => {
      // Arrange
      mockRequest = {
        params: { id: '1' }
      };
      
      const error = new Error('Erreur de base de données');
      mockDepartementService.getById = jest.fn().mockRejectedValue(error);
      
      // Act
      await departementController.getDepartementById(mockRequest as Request, mockResponse as Response);
      
      // Assert
      expect(mockDepartementService.getById).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ 
        message: 'Impossible de récupérer le département.' 
      });
    });
  });

  // Tests pour getDepartementByNumber
  describe('getDepartementByNumber', () => {
    test('devrait retourner un département avec statut 200 quand numéro valide', async () => {
      // Arrange
      mockRequest = {
        params: { number: '75' }
      };
      
      const mockDepartement = { 
        id: 1, 
        name: 'Paris', 
        departement_number: '75' 
      } as Departement;
      
      mockDepartementService.getByDepartementNumber = jest.fn().mockResolvedValue(mockDepartement);
      
      // Act
      await departementController.getDepartementByNumber(mockRequest as Request, mockResponse as Response);
      
      // Assert
      expect(mockDepartementService.getByDepartementNumber).toHaveBeenCalledWith('75');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockDepartement);
    });

    test('devrait retourner 400 quand numéro manquant', async () => {
      // Arrange
      mockRequest = {
        params: { }
      };
      
      // Act
      await departementController.getDepartementByNumber(mockRequest as Request, mockResponse as Response);
      
      // Assert
      expect(mockDepartementService.getByDepartementNumber).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ 
        message: 'Numéro de département invalide.' 
      });
    });
  });

  // Tests pour createDepartement
  describe('createDepartement', () => {
    test('devrait créer un département avec statut 201', async () => {
      // Arrange
      const departementData = { 
        name: 'Paris', 
        departement_number: '75' 
      };
      
      mockRequest = {
        body: departementData
      };
      
      mockDepartementService.create = jest.fn().mockResolvedValue(true);
      
      // Act
      await departementController.createDepartement(mockRequest as Request, mockResponse as Response);
      
      // Assert
      expect(mockDepartementService.create).toHaveBeenCalledWith(departementData);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({ 
        message: 'Département créé avec succès.' 
      });
    });

    test('devrait retourner 400 quand création échoue', async () => {
      // Arrange
      const departementData = { 
        name: 'Paris', 
        departement_number: '75' 
      };
      
      mockRequest = {
        body: departementData
      };
      
      mockDepartementService.create = jest.fn().mockResolvedValue(false);
      
      // Act
      await departementController.createDepartement(mockRequest as Request, mockResponse as Response);
      
      // Assert
      expect(mockDepartementService.create).toHaveBeenCalledWith(departementData);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ 
        message: 'Échec de la création du département.' 
      });
    });
  });

  // Tests pour updateDepartement
  describe('updateDepartement', () => {
    test('devrait mettre à jour un département avec statut 200', async () => {
      // Arrange
      const departementId = 1;
      const departementData = { 
        name: 'Paris (updated)', 
        departement_number: '75' 
      };
      
      mockRequest = {
        params: { id: departementId.toString() },
        body: departementData
      };
      
      mockDepartementService.update = jest.fn().mockResolvedValue(true);
      
      // Act
      await departementController.updateDepartement(mockRequest as Request, mockResponse as Response);
      
      // Assert
      expect(mockDepartementService.update).toHaveBeenCalledWith(departementId, departementData);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ 
        message: 'Département mis à jour avec succès.' 
      });
    });
  });

  // Tests pour deleteDepartement
  describe('deleteDepartement', () => {
    test('devrait supprimer un département avec statut 200', async () => {
      // Arrange
      mockRequest = {
        params: { id: '1' }
      };
      
      mockDepartementService.delete = jest.fn().mockResolvedValue(true);
      
      // Act
      await departementController.deleteDepartement(mockRequest as Request, mockResponse as Response);
      
      // Assert
      expect(mockDepartementService.delete).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ 
        message: 'Département supprimé avec succès.' 
      });
    });

    test('devrait retourner 400 quand ID invalide', async () => {
      // Arrange
      mockRequest = {
        params: { id: 'abc' }
      };
      
      // Act
      await departementController.deleteDepartement(mockRequest as Request, mockResponse as Response);
      
      // Assert
      expect(mockDepartementService.delete).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ 
        message: 'ID département invalide.' 
      });
    });
  });
});