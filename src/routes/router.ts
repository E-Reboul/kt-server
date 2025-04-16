import { Router } from "express";
import usersRoute from "./users";
import organisationsRoute from "./organization";
const router = Router();

router.use("/users", usersRoute);

router.use("/organisations", organisationsRoute);

export default router;