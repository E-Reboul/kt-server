import { Router } from "express";
import OrganisationsController from "../controllers/Organisations";

const organisationsController = new OrganisationsController();

const organisationsRoute = Router();

organisationsRoute.get("/", organisationsController.getAll.bind(organisationsController));
organisationsRoute.get("/:id", organisationsController.getById.bind(organisationsController));
organisationsRoute.post("/", organisationsController.create.bind(organisationsController));
organisationsRoute.put("/:id", organisationsController.update.bind(organisationsController));
organisationsRoute.delete("/:id", organisationsController.delete.bind(organisationsController));

export default organisationsRoute;