import { plainToInstance } from "class-transformer";
import { NextFunction, Request, Response } from "express";

import { UserLoginDTO } from "../dtos/user.dto";
import AuthService from "../services/auth.service";

class AuthController {
	async login(req: Request, res: Response, next: NextFunction) {
		const userDTO = plainToInstance(UserLoginDTO, req.body);
		const userAndTokens = await AuthService.login(userDTO);

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
