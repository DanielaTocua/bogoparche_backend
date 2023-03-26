import { Request, Response } from "express";

import * as eventServices from "../services/event.service";
import { STATUS_CODES } from "../utils/constants";
import toNewEventEntry from "../utils/event.utils";

class EventController {
	async getEvent(req: Request, res: Response): Promise<void> {
		const result = eventServices.findEventById(req.params.id);
		const rowCount = (await result).rowCount;
		const rows = (await result).rows;
		rowCount != 0 ? res.json(rows[0]) : res.status(STATUS_CODES.NOT_FOUND);
	}

	async deleteEvent(req: Request, res: Response): Promise<void> {
		const result = eventServices.findEventById(req.params.id);
		const rowCount = (await result).rowCount;
		if (rowCount === 0) {
			res
				.json({ message: "No existe el registro que desea eliminar" })
				.status(STATUS_CODES.NOT_FOUND);
		}
		eventServices.deleteEvent(req.params.id);
		const rows = (await result).rows;
		res.json(rows);
	}

	async addEvent(req: Request, res: Response): Promise<void> {
		try {
			// Retrieves event info
			const newEventEntry = toNewEventEntry(req.body);
			// Connects to de DB
			const result = eventServices.addEvent(await newEventEntry);
			const id = (await result).rows[0].id_actividad;
			res.json({id});
		} catch (error) {
			res.json({ error: error }).status(STATUS_CODES.BAD_REQUEST);
		}
	}
}

export default new EventController();
