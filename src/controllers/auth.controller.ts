import { NextFunction, Request, Response } from "express";

import AuthService from "../services/auth.service";

class AuthController {
	async login(req: Request, res: Response, next: NextFunction) {
		const userAndTokens = await AuthService.login(req.body);

		return res.status(200).send(userAndTokens);
	}
	async refreshToken(req: Request, res: Response, next: NextFunction) {
		const tokens = await AuthService.refresh(
			req.email as string,
			req.username as string,
			req.body.refresh,
		);
		return res.status(200).send(tokens);
	}
}

export default new AuthController();
