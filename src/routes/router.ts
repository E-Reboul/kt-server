import { Router } from "express";
import usersRoute from "./users";
import charactersRoute from "./character";

const router = Router();

router.use("/users", usersRoute);
router.use("/characters", charactersRoute);

export default router;
