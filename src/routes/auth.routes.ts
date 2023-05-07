import express from "express";

import AuthController from "../controllers/auth.controller";
import asyncErrorMiddleware from "../middlewares/asyncError.middleware";
import refreshMiddleware from "../middlewares/refresh.middleware";
import dtoValidationMiddleware from "../middlewares/dtoValidation.middleware";
import { UserLoginDTO } from "../dtos/user.dto";

const router = express.Router();
// Routes for database
// Configurar rutas

router.post("/login",dtoValidationMiddleware(UserLoginDTO), asyncErrorMiddleware(AuthController.login));

router.post(
	"/refresh",
	refreshMiddleware,
	asyncErrorMiddleware(AuthController.refreshToken),
);

export default router;
