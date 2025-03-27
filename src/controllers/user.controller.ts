import { NextFunction, Request, Response } from "express";

import { UserPublicDTO } from "../dtos/user.dto";
import { ServerError } from "../errors/server.error";

import UserFacade from "../facades/user.facade";
import { STATUS_CODES } from "../utils/constants";

class UserController {
	async registerUser(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const userPublicData = await UserFacade.registerUser(req.body);
		res.json(userPublicData).status(STATUS_CODES.OK);
	}

	async getUsernames(req: Request, res: Response): Promise<void> {
		const usernames = await UserFacade.getUsernames();
		res.json(usernames).status(STATUS_CODES.OK);
	}
	
	async getUserFromToken(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		if (req.isAdmin == undefined || !req.email || !req.username) {
			console.log(req.isAdmin, req.email, req.username);
			// If the auth middleware is not implemented, this will fail
			throw new ServerError(
				"You are not authorized to view this user",
				STATUS_CODES.UNAUTHORIZED,
			);
		}
		const user = new UserPublicDTO(); // Won't pass into the facade, because it will return the user from the token
		user.isAdmin = req.isAdmin;
		user.email = req.email;
		user.username = req.username;
		res.json(user).status(STATUS_CODES.OK);
	}
}

export default new UserController();
