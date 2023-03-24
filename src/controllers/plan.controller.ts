import { Request, Response } from "express";

import * as planServices from "../services/plan.service";
import { STATUS_CODES } from "../utils/constants";
import toNewPlanEntry from "../utils/plan.utils";

class PlanController {
	async getPlan(req: Request, res: Response): Promise<void> {
		const result = planServices.findPlanById(req.params.id);
		const rowCount = (await result).rowCount;
		const rows = (await result).rows;
		rowCount != 0 ? res.json(rows) : res.status(STATUS_CODES.NOT_FOUND);
	}

	async deletePlan(req: Request, res: Response): Promise<void> {
		const result = planServices.findPlanById(req.params.id);
		const rowCount = (await result).rowCount;
		if (rowCount === 0) {
			res
				.json({ message: "No existe el registro que desea eliminar" })
				.status(STATUS_CODES.NOT_FOUND);
		}
		planServices.deletePlan(req.params.id);
		const rows = (await result).rows;
		res.json(rows);
	}

	async addPlan(req: Request, res: Response): Promise<void> {
		try {
			// Retrieves plan info
			const newPlanEntry = toNewPlanEntry(req.body);
			console.log(newPlanEntry);
			const result = planServices.addPlan(newPlanEntry);
			const id = (await result).rows[0].id;
			res.json(id);
		} catch (error) {
			res.json({ error: error }).status(STATUS_CODES.BAD_REQUEST);
		}
	}
}

export default new PlanController();
