import { NextFunction, Request, Response } from "express";

import registerFacade from "../facades/register.facade";
import { STATUS_CODES } from "../utils/constants";

class RegisterController {
	async registerUser(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		console.log("controller");
		const { username, email, password } = req.body;
		res
			.json(await registerFacade.registerUser(username, email, password))
			.status(STATUS_CODES.OK);
	}
}

export default new RegisterController();
