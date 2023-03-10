import { NextFunction, Request, Response } from "express";
import passport from "passport";

import UserModel from "@/models/user.model";

import loginService from "../services/login.service";

class LoginController {
	async loginUser(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		passport.authenticate("login", async (err: Error, user: UserModel) => {
				if (err || !user) {
					const error = new Error("An error occurred.");
					return next(error);
				}
				req.login(user, { session: false }, async (error) => {
					if (error) return next(error);
					return res.json(await loginService.loginUser(user));
				});
		})(req,res,next);
	}
}

export default new LoginController();
