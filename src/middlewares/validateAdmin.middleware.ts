import { NextFunction, Request, Response } from "express";

import { User } from "../entity/User";
import { ServerError } from "../errors/server.error";
import { STATUS_CODES } from "../utils/constants";

export default async (req: Request, res: Response, next: NextFunction) => {
	const username = req.username;
	const user = await User.findOneBy({ username });
	if (user == null) {
		next(
			new ServerError("The user could not be found", STATUS_CODES.BAD_REQUEST),
		);
	}
	const isAdmin = (user as User).isAdmin;
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
