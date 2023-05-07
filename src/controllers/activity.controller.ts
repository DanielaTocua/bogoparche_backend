import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";

import {
	EventUpdateDTO,
	NewAttendanceEntryDTO,
	NewFavoriteEntryDTO,
	PlanUpdateDTO,
} from "../dtos/activity.dto";
import { ServerError } from "../errors/server.error";
import eventFacade from "../facades/event.facade";
import planFacade from "../facades/plan.facade";
import activityService from "../services/activity.service";
import { STATUS_CODES } from "../utils/constants";

class ActivityController {
	async getAll(req: Request, res: Response): Promise<void> {
		const result = await activityService.findAllPublic();
		res.send(result);
	}

	async editActivity(req: Request, res: Response): Promise<void> {
		if (!("es_plan" in req.params)) {
			throw new ServerError("es_plan not defined", STATUS_CODES.BAD_REQUEST);
		}

		const esPlan = JSON.parse(req.params.es_plan);
		if (esPlan) {
			const newPlanUpdated = plainToInstance(PlanUpdateDTO, req.body, {
				excludeExtraneousValues: true,
			});
			const result = await planFacade.editPlan(
				parseInt(req.params.id),
				newPlanUpdated,
			);
			res.json(result);
		} else {
			const newEventUpdated = plainToInstance(EventUpdateDTO, req.body, {
				excludeExtraneousValues: true,
			});
			const result = await eventFacade.editEvent(
				parseInt(req.params.id),
				newEventUpdated,
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
			const result = await planFacade.deletePlan(parseInt(req.params.id));
			res.json(result);
		} else {
			const result = await eventFacade.deleteEvent(parseInt(req.params.id));
			res.json(result);
		}
	}

	async getActivity(req: Request, res: Response): Promise<void> {
		if (!("es_plan" in req.params)) {
			throw new ServerError("es_plan not defined", STATUS_CODES.BAD_REQUEST);
		}
		const esPlan = JSON.parse(req.params.es_plan);
		if (esPlan) {
			const result = await planFacade.getPlan(parseInt(req.params.id));
			res.json(result);
		} else {
			const result = await eventFacade.getEvent(parseInt(req.params.id));
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

	async addFavorites(req: Request, res: Response): Promise<void> {
		// Retrieves plan info
		const newFavoriteEntry = plainToInstance(NewFavoriteEntryDTO, req.body, {
			excludeExtraneousValues: true,
		});
		await activityService.addFavorites(newFavoriteEntry);
		res.json({ msg: "Favorite succesfully added" });
	}

	async deleteFavorites(req: Request, res: Response): Promise<void> {
		await activityService.deleteFavorites(parseInt(req.params.id));
		res.json({ msg: "Favorite succesfully deleted" });
	}

	async getFavorites(req: Request, res: Response): Promise<void> {
		const newFavoriteEntry = plainToInstance(NewFavoriteEntryDTO, req.body, {
			excludeExtraneousValues: true,
		});
		const id = await activityService.findFavorites(newFavoriteEntry);
		res.json(id);
	}

	async addAttendance(req: Request, res: Response): Promise<void> {
		// Retrieves plan info
		const newAttendanceEntry = plainToInstance(
			NewAttendanceEntryDTO,
			req.body,
			{
				excludeExtraneousValues: true,
			},
		);
		await activityService.addAttendance(newAttendanceEntry);
		res.json({ msg: "Attendance succesfully added" });
	}

	async deleteAttendance(req: Request, res: Response): Promise<void> {
		await activityService.deleteAttendance(parseInt(req.params.id));
		res.json({ msg: "Attendance succesfully deleted" });
	}

	async getAttendance(req: Request, res: Response): Promise<void> {
		const newAttendanceEntry = plainToInstance(
			NewAttendanceEntryDTO,
			req.body,
			{
				excludeExtraneousValues: true,
			},
		);
		const id = await activityService.findAttendance(newAttendanceEntry);
		res.json(id);
	}
}
export default new ActivityController();
