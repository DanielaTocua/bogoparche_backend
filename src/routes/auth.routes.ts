import express from "express";

import AuthController from "../controllers/auth.controller";
import UserController from "../controllers/user.controller";
import asyncErrorMiddleware from "../middlewares/asyncError.middleware";
import refreshMiddleware from "../middlewares/refresh.middleware";

const router = express.Router();
// Routes for database
// Configurar rutas
router.post("/signup", asyncErrorMiddleware(UserController.registerUser));

router.post("/login", asyncErrorMiddleware(AuthController.login));
router.post(
	"/refresh",
	refreshMiddleware,
	asyncErrorMiddleware(AuthController.refreshToken),
);

router.get("/login-success", (req, res) => {
	res.send("Login successful");
});

router.get("/login-failure", (req, res) => {
	res.send("Incorrect username or password");
});

export default router;
