import { instanceToPlain } from "class-transformer";
import { validate } from "class-validator";

import { NewPlanEntryDTO, PlanUpdateDTO } from "@/dtos/activity.dto";

import { Plan } from "../entity/Plan";
import { ServerError } from "../errors/server.error";
import { STATUS_CODES } from "../utils/constants";

class PlanService {
	// Find Plan by Id
	async findPlanById(id: number): Promise<any> {
		if (typeof id != "number") {
			throw new ServerError("Invalid id", STATUS_CODES.BAD_REQUEST);
		}
		try {
			const plan = await Plan.findOneOrFail({ where: { id: id } });
			const planWithEsPlan = { ...plan, es_plan: true };
			return planWithEsPlan;
		} catch {
			throw new ServerError(
				`The plan id: ${id} does not exist`,
				STATUS_CODES.BAD_REQUEST,
			);
		}
	}

	// Adds the id to the json
	async addPlan(newPlanEntry: NewPlanEntryDTO): Promise<Plan> {
		console.log(newPlanEntry);
		console.log(instanceToPlain(newPlanEntry));

		// Looks for errors in newPlanEntry
		const inputErrors = await validate(newPlanEntry);
		if (inputErrors.length > 0) {
			throw new ServerError("Invalid form", STATUS_CODES.BAD_REQUEST);
		}

		// Adds the plan
		const newPlan = Plan.create(instanceToPlain(newPlanEntry));
		return await newPlan.save();
	}

	// Edits Plan
	async editPlan(id: number, planEntry: PlanUpdateDTO): Promise<Plan> {
		// Finds plan
		await this.findPlanById(id);

		// Looks for errors in planEntry
		const inputErrors = await validate(planEntry);
		if (inputErrors.length > 0) {
			throw new ServerError("Invalid form", STATUS_CODES.BAD_REQUEST);
		}
		await Plan.update(id, instanceToPlain(planEntry));

		return await Plan.findOneOrFail({ where: { id } });
	}

	// Deletes plan
	async deletePlan(id: number): Promise<Plan> {
		if (typeof id != "number") {
			throw new ServerError("Invalid id", STATUS_CODES.BAD_REQUEST);
		}
		const plan = await this.findPlanById(id);
		return Plan.remove(plan);
	}
}

export default new PlanService();
