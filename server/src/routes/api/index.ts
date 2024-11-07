import { Router } from "express";
import { userRouter } from "./userRoutes.js";
import { recipeRouter } from "./recipeRoutes.js";

const router = Router();

router.use("/users", userRouter);
router.use("/recipe", recipeRouter);

export default router;
