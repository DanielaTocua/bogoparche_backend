import { NextFunction, Request, Response } from "express";

import { User } from "../entity/User";
import { ServerError } from "../errors/server.error";
import { STATUS_CODES } from "../utils/constants";

export default async (req: Request, res: Response, next: NextFunction) => {
	
	const username = req.username;
	const user = await User.findOneByOrFail({ username });
	const isAdmin = user.isAdmin;
	if (isAdmin) {
		return next();
	}
	next(
		new ServerError(
			"The user does not have the required permissions",
			STATUS_CODES.FORBIDDEN,
		),
	);
};
