import express from "express";

import loginController from "../controllers/login.controller";
import registerController from "../controllers/register.controller";
import asyncErrorMiddleware from "../middlewares/asyncError.middleware";

const router = express.Router();
// Routes for database
// Configurar rutas
router.post("/signup", asyncErrorMiddleware(registerController.registerUser));

router.post("/login",  asyncErrorMiddleware(loginController.loginUser));

router.get("/login-success", (req, res) => {
	res.send("Login successful");
});

router.get("/login-failure", (req, res) => {
	res.send("Incorrect username or password");
});

export default router;
