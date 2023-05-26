import express from "express";

import AuthController from "../controllers/auth.controller";
import { UserLoginDTO } from "../dtos/user.dto";
import asyncErrorMiddleware from "../middlewares/asyncError.middleware";
import dtoValidationMiddleware from "../middlewares/dtoValidation.middleware";
import refreshMiddleware from "../middlewares/refresh.middleware";

const router = express.Router();
// Routes for database
// Configurar rutas

router.post(
	"/login",
	dtoValidationMiddleware(UserLoginDTO),
	asyncErrorMiddleware(AuthController.login),
);

router.post(
	"/refresh",
	refreshMiddleware,
	asyncErrorMiddleware(AuthController.refreshToken),
);

export default router;
