import express from "express";
import jwt from "jsonwebtoken";
import passport from "passport";

import registerController from "../controllers/register.controller";
import asyncErrorMiddleware from "../middlewares/asyncError.middleware";
import UserModel from "../models/user.model";

const router = express.Router();
// Routes for database
// Configurar rutas
router.post("/signup", asyncErrorMiddleware(registerController.registerUser));

router.post("/login", async (req, res, next) => {
	passport.authenticate("login", async (err: Error, user: UserModel) => {
		try {
			if (err || !user) {
				const error = new Error("An error occurred.");
				return next(error);
			}
			req.login(user, { session: false }, async (error) => {
				if (error) return next(error);

				const body = { id: user.id, email: user.email };
				const token = jwt.sign({ user: body }, "Random string");

				return res.json({ token });
			});
		} catch (error) {
			return next(error);
		}
	})(req, res, next);
});

router.get("/login-success", (req, res) => {
	res.send("Login successful");
});

router.get("/login-failure", (req, res) => {
	res.send("Incorrect username or password");
});

export default router;
