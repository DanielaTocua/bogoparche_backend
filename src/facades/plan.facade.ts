import planService from "../services/plan.service";
import {Plan} from '../entity/Plan'
import { NewPlanEntryDTO, PlanUpdateDTO } from "../dtos/activity.dto";

class PlanFacade {
    async getPlan (id: number): Promise<Plan> {
		// Gets Plan
		const result = await planService.findPlanById(id);
		return result;
	}

	async deletePlan(id: number): Promise<Plan> {
		// Deletes Plan
		const result = await planService.deletePlan(id);
		return result;
	}

	async editPlan(id: number, newEventUpdated: PlanUpdateDTO): Promise<Plan> {
		// Updates info
        const result = await planService.editPlan(
			id, newEventUpdated);
		return result;
	}

    async addPlan(newEventEntry: NewPlanEntryDTO): Promise<Plan> {
		// Adds info
        const result = await planService.addPlan(
			newEventEntry,
		);
		return result;
	}

}
export default new PlanFacade()