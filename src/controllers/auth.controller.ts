import { NextFunction, Request, Response } from "express";

import AuthService from "../services/auth.service";
import { STATUS_CODES } from "../utils/constants";

class AuthController {
	async login(req: Request, res: Response, next: NextFunction) {
		const userAndTokens = await AuthService.login(req.body);
		return res.json(userAndTokens).status(STATUS_CODES.OK);
	}
	async refreshToken(req: Request, res: Response, next: NextFunction) {
		const tokens = await AuthService.refresh(
			req.email as string,
			req.username as string,
			req.body.refresh,
		);
		return res.json(tokens).status(STATUS_CODES.OK);
	}
}

export default new AuthController();
