import { NextFunction, Request, Response } from "express";

import { ServerError } from "../errors/server.error";
import { STATUS_CODES } from "../utils/constants";

export default async (req: Request, res: Response, next: NextFunction) => {
		if (!("id" in req.params) || isNaN(parseInt(req.params.id))) {
			next(new ServerError("Invalid id", STATUS_CODES.BAD_REQUEST));
		}
		next();
	
}

