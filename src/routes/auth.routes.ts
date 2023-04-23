import express from "express";

import AuthController from "../controllers/auth.controller";
import asyncErrorMiddleware from "../middlewares/asyncError.middleware";
import refreshMiddleware from "../middlewares/refresh.middleware";

const router = express.Router();
// Routes for database
// Configurar rutas

router.post("/login", asyncErrorMiddleware(AuthController.login));
router.post(
	"/refresh",
	refreshMiddleware,
	asyncErrorMiddleware(AuthController.refreshToken),
);

export default router;
