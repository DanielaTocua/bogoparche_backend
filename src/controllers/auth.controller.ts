import { NextFunction, Request, Response } from "express";

import authFacade from "../facades/auth.facade";
import { STATUS_CODES } from "../utils/constants";

class AuthController {
	async auth(req: Request, res: Response, next: NextFunction): Promise<void> {
		res.json(await authFacade.auth()).status(STATUS_CODES.OK);
	}
}

export default new AuthController();
