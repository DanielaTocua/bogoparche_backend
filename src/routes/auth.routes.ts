import express from "express";

import AuthController from "../controllers/auth.controller";
<<<<<<< HEAD
=======
import UserController from "../controllers/user.controller";
>>>>>>> 7a99664b067eb018fba5ca9bb0f8c9e0df84186c
import asyncErrorMiddleware from "../middlewares/asyncError.middleware";
import refreshMiddleware from "../middlewares/refresh.middleware";

const router = express.Router();
// Routes for database
// Configurar rutas
<<<<<<< HEAD
=======
router.post("/signup", asyncErrorMiddleware(UserController.registerUser));
>>>>>>> 7a99664b067eb018fba5ca9bb0f8c9e0df84186c

router.post("/login", asyncErrorMiddleware(AuthController.login));
router.post(
	"/refresh",
	refreshMiddleware,
	asyncErrorMiddleware(AuthController.refreshToken),
);
<<<<<<< HEAD
=======

router.get("/login-success", (req, res) => {
	res.send("Login successful");
});

router.get("/login-failure", (req, res) => {
	res.send("Incorrect username or password");
});
>>>>>>> 7a99664b067eb018fba5ca9bb0f8c9e0df84186c

export default router;
