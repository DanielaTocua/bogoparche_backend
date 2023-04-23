import { plainToInstance } from "class-transformer";
import { NextFunction, Request, Response } from "express";

import { UserRegisterDTO } from "../dtos/user.dto";
import UserFacade from "../facades/user.facade";
import { STATUS_CODES } from "../utils/constants";

class UserController {
	async registerUser(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const userDTO = plainToInstance(UserRegisterDTO, req.body, {
			excludeExtraneousValues: true,
		});
		res.json(await UserFacade.registerUser(userDTO)).status(STATUS_CODES.OK);
	}
}

export default new UserController();
