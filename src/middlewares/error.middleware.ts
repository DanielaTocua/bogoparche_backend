import { NextFunction, Request, Response } from "express";

import { ServerError } from "../errors/server.error";

export default (
	err: ServerError,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	res
		.json({
			error: err.message,
		})
		.status(err.code);
};
