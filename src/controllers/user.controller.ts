import { NextFunction, Request, Response } from "express";

import UserFacade from "../facades/user.facade";
import { STATUS_CODES } from "../utils/constants";


class UserController {
	async registerUser(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const userPublicData = await UserFacade.registerUser(req.body)
		res.json(userPublicData).status(STATUS_CODES.OK);
	}
}

export default new UserController();
