import { Request, Response } from "express";

import * as activityServices from "../services/activity.service";
import eventController from "./event.controller";
import planController from "./plan.controller";

class ActivityController {
	async getAll(req: Request, res: Response): Promise<void> {
		const result = activityServices.findAll();
		res.send((await result).rows);
	}

	async addActivity(req: Request, res: Response): Promise<void> {
		const esPlan = req.body.es_plan;
		if (esPlan) {
			planController.addPlan(req, res);
		} else {
			eventController.addEvent(req, res);
		}
	}
}

export default new ActivityController();
