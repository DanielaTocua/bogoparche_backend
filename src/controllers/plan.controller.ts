import { Request, Response } from "express";

import {
	EventUpdateDTO,
	NewFavoriteEntryDTO,
	PlanUpdateDTO,
} from "../dtos/activity.dto";
import { ServerError } from "../errors/server.error";
import eventFacade from "../facades/event.facade";
import planFacade from "../facades/plan.facade";
import { STATUS_CODES } from "../utils/constants";

class PlanController {
	async addPlan(req: Request, res: Response): Promise<void> {
		const result = await planFacade.addPlan(
			{ ...req.body, es_plan: true },
			req.isAdmin as boolean,
		);
		res.json({ id: result.id }).status(STATUS_CODES.OK);
	}

	async editPlan(req: Request, res: Response): Promise<void> {
		const result = await planFacade.editPlan(
			parseInt(req.params.id),
			req.body,
		);
		res.json(result).status(STATUS_CODES.OK);
	}

	async deletePlan(req: Request, res: Response): Promise<void> {
		const result = await planFacade.deletePlan(parseInt(req.params.id));
		res.json(result);
		}

	async getPlan(req: Request, res: Response): Promise<void> {
		const result = await planFacade.getPlan(parseInt(req.params.id));
		res.json(result);
	}
}
export default new PlanController();
