import { Router } from "express";
import DepartementController from "../controllers/DepartementController";

const departementController = new DepartementController();

const departementRoute = Router();

// Routes CRUD de base
departementRoute.get("/", departementController.getAllDepartements.bind(departementController));
departementRoute.get("/:id", departementController.getDepartementById.bind(departementController));
departementRoute.get("/number/:number", departementController.getDepartementByNumber.bind(departementController));
departementRoute.post("/", departementController.createDepartement.bind(departementController));
departementRoute.put("/:id", departementController.updateDepartement.bind(departementController));
departementRoute.delete("/:id", departementController.deleteDepartement.bind(departementController));

export default departementRoute;