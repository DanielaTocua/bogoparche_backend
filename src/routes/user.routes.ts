import express from "express";

import UserController from "../controllers/user.controller";
import asyncErrorMiddleware from "../middlewares/asyncError.middleware";

const router = express.Router();
// Routes for database
// Configurar rutas
router.post("/createUser", asyncErrorMiddleware(UserController.registerUser));

export default router;
