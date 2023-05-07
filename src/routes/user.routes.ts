import express from "express";

import UserController from "../controllers/user.controller";
import { UserRegisterDTO } from "../dtos/user.dto";
import asyncErrorMiddleware from "../middlewares/asyncError.middleware";
import dtoValidationMiddleware from "../middlewares/dtoValidation.middleware";

const router = express.Router();
// Routes for database
// Configurar rutas
router.post("/createUser",dtoValidationMiddleware(UserRegisterDTO),  asyncErrorMiddleware(UserController.registerUser));

export default router;
