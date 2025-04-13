import { Router } from "express";
import OrganisationsController from "../controllers/Organisations";

const organisationsController = new OrganisationsController();

const organisationsRoute = Router();

organisationsRoute.get("/", organisationsController.getAllOrganisations.bind(organisationsController));
organisationsRoute.get("/:id", organisationsController.getOrganisationById.bind(organisationsController));
organisationsRoute.post("/", organisationsController.createOrganisation.bind(organisationsController));
organisationsRoute.put("/:id", organisationsController.updateOrganisation.bind(organisationsController));
organisationsRoute.delete("/:id", organisationsController.deleteOrganisation.bind(organisationsController));

export default organisationsRoute;