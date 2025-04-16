import { Router } from "express";
import usersRoute from "./users";
import answerRoute from "./answerRoute";

const router = Router();

router.use("/users", usersRoute);
router.use("/answers", answerRoute);

export default router;