import { Request, Response } from "express";

import eventFacade from "../facades/event.facade";
import { STATUS_CODES } from "../utils/constants";

class EventController {
	async addEvent(req: Request, res: Response): Promise<void> {
		const result = await eventFacade.addEvent(
			{ ...req.body, es_plan: false },
			req.isAdmin as boolean,
		);
		res.json({ id: result.id }).status(STATUS_CODES.OK);
	}

	async editEvent(req: Request, res: Response): Promise<void> {
		const result = await eventFacade.editEvent(
			parseInt(req.params.id),
			req.body,
		);
		res.json(result).status(STATUS_CODES.OK);
	}

	async getEvent(req: Request, res: Response): Promise<void> {
		const result = await eventFacade.getEvent(parseInt(req.params.id));
		res.json(result);
	}
}
export default new EventController();
