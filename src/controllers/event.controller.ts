import { Request, Response } from "express";

import eventService from "../services/event.service";

class EventController {
	async getEvent(req: Request, res: Response): Promise<void> {
		const result = eventService.findEventById(parseInt(req.params.id));
		res.json(result);
	}

	async deleteEvent(req: Request, res: Response): Promise<void> {
		const result = await eventService.deleteEvent(parseInt(req.params.id));
		res.json(result);
	}

	async editEvent(req: Request, res: Response): Promise<void> {
		// Updates info
	}
}

export default new EventController();
