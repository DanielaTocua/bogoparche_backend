import { Request, Response } from "express";

import * as activityServices from "../services/activity.service";
import eventController from "./event.controller";
import planController from "./plan.controller";
import activityServiceTemp from "../services/activity.service-temp";

class ActivityController {
	async getAll(req: Request, res: Response): Promise<void> {
		const result = await activityServiceTemp.findAllPublic();
		res.send(result);
	}

	async addActivity(req: Request, res: Response): Promise<void> {
		const esPlan = req.body.es_plan;
		if (esPlan) {
			planController.addPlan(req, res);
		} else {
			eventController.addEvent(req, res);
		}
	}

	async editActivity(req: Request, res: Response): Promise<void> {
		const esPlan = JSON.parse(req.params.es_plan);
		if (esPlan) {
			planController.editPlan(req, res);
		} else {
			eventController.editEvent(req, res);
		}
	}

	async deleteActivity(req: Request, res: Response): Promise<void> {
		const esPlan = JSON.parse(req.params.es_plan);
		if (esPlan) {
			planController.deletePlan(req, res);
		} else {
			eventController.deleteEvent(req, res);
		}
	}

	async getActivity(req: Request, res: Response): Promise<void> {
		const esPlan = JSON.parse(req.params.es_plan);
		if (esPlan) {
			planController.getPlan(req, res);
		} else {
			eventController.getEvent(req, res);
		}
	}

	async filter(req: Request, res: Response): Promise<void> {
		let filtered = (await activityServices.findAll()).rows;

		const search: string[] = req.query.search
			? (req.query.search as string).split(" ")
			: [];
		const rangePrices: string[] = req.query.range_prices
			? (req.query.range_prices as string).split(",")
			: [];
		const categories: string[] = req.query.categories
			? (req.query.categories as string).split(",")
			: [];

		const filteredByCateg: any[] = [];

		// Filter by Price
		filtered = activityServices.filterByPrices(rangePrices, filtered);

		// Filter by Categories
		filtered = await activityServices.filterByCategory(categories, filtered);

		// Search
		filtered = activityServices.searchByWords(search, filtered);
		res.send(filtered);
	}
}
export default new ActivityController();
