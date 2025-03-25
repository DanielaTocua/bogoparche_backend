import express from "express";

import UserController from "../controllers/user.controller";
import { UserRegisterDTO } from "../dtos/user.dto";
import asyncErrorMiddleware from "../middlewares/asyncError.middleware";
import dtoValidationMiddleware from "../middlewares/dtoValidation.middleware";
import authMiddleware from "../middlewares/auth.middleware";

const router = express.Router();
// Routes for database
// Configurar rutas
router.post(
	"",
	dtoValidationMiddleware(UserRegisterDTO),
	asyncErrorMiddleware(UserController.registerUser),
);

router.get("/me", 
	authMiddleware,
	asyncErrorMiddleware(UserController.getUserFromToken));

export default router;
