import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";

import { EventUpdateDTO, NewEventEntryDTO } from "../dtos/activity.dto";
import { ServerError } from "../errors/server.error";
import activityService from "../services/activity.service";
import eventService from "../services/event.service";
import { STATUS_CODES } from "../utils/constants";
import planController from "./plan.controller";

class ActivityController {
	async getAll(req: Request, res: Response): Promise<void> {
		const result = await activityService.findAllPublic();
		res.send(result);
	}

	async addActivity(req: Request, res: Response): Promise<void> {
		if (!("es_plan" in req.body)) {
			throw new ServerError(
				"es_plan invalid or not defined",
				STATUS_CODES.BAD_REQUEST,
			);
		}
		const esPlan = req.body.es_plan;
		if (esPlan) {
			planController.addPlan(req, res);
		} else {
			const newEventEntry = plainToInstance(NewEventEntryDTO, req.body, {
				excludeExtraneousValues: true,
			});
			const result = await eventService.addEvent(newEventEntry);
			const id = result.id;
			res.json({ id });
		}
	}

	async editActivity(req: Request, res: Response): Promise<void> {
		if (!("es_plan" in req.params)) {
			throw new ServerError("es_plan not defined", STATUS_CODES.BAD_REQUEST);
		}

		const esPlan = JSON.parse(req.params.es_plan);
		if (esPlan) {
			planController.editPlan(req, res);
		} else {
			const newEventEntry = plainToInstance(EventUpdateDTO, req.body, {
				excludeExtraneousValues: true,
			});
			const result = await eventService.editEvent(
				parseInt(req.params.id),
				newEventEntry,
			);
			res.json(result);
		}
	}

	async deleteActivity(req: Request, res: Response): Promise<void> {
		if (!("es_plan" in req.params)) {
			throw new ServerError("es_plan not defined", STATUS_CODES.BAD_REQUEST);
		}
		const esPlan = JSON.parse(req.params.es_plan);
		if (esPlan) {
			planController.deletePlan(req, res);
		} else {
			const result = await eventService.deleteEvent(parseInt(req.params.id));
			res.json(result);
		}
	}

	async getActivity(req: Request, res: Response): Promise<void> {
		if (!("es_plan" in req.params)) {
			throw new ServerError("es_plan not defined", STATUS_CODES.BAD_REQUEST);
		}
		const esPlan = JSON.parse(req.params.es_plan);
		if (esPlan) {
			planController.getPlan(req, res);
		} else {
			const result = eventService.findEventById(parseInt(req.params.id));
			res.json(result);
		}
	}

	async filter(req: Request, res: Response): Promise<void> {
		let filtered = await activityService.findAllPublic();

		const search: string[] = req.query.search
			? (req.query.search as string).split(" ")
			: [];
		const rangePrices: string[] = req.query.range_prices
			? (req.query.range_prices as string).split(",")
			: [];
		const categories: string[] = req.query.categories
			? (req.query.categories as string).split(",")
			: [];

		// Filter by Price
		filtered = activityService.filterByPrices(rangePrices, filtered);

		// Filter by Categories
		filtered = await activityService.filterByCategory(categories, filtered);

		// Search
		filtered = activityService.searchByWords(search, filtered);
		res.send(filtered);
	}
}
export default new ActivityController();
