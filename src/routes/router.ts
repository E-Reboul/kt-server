import { Router } from "express";
import usersRoute from "./users";
import questionRoute from "./questions";

const router = Router();

router.use("/users", usersRoute);
router.use("/questions", questionRoute);

export default router;