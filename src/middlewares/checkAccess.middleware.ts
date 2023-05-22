import { NextFunction, Request, Response } from "express";

import { ServerError } from "../errors/server.error";
import activityService from "../services/activity.service";
import { STATUS_CODES } from "../utils/constants";

export default async (req: Request, res: Response, next: NextFunction) => {
	const activity = await activityService.findActivityById(
		parseInt(req.params.id),
	);

	// checks if event is private
	if (activity.es_privada) {
		// checks if user is the owner of the event
		if (activity.id_usuario !== req.userId)
			next(
				new ServerError(
					"You don't have access to this activity",
					STATUS_CODES.FORBIDDEN,
				),
			);
	} else {
		// checks if user is admin
		if (req.isAdmin) {
			next(
				new ServerError(
					"You don't have access to this activity",
					STATUS_CODES.FORBIDDEN,
				),
			);
		}
	}
	next();
};
