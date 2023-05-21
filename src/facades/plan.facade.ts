import { Activity } from "../entity/Activity";
import { NewPlanEntryDTO, PlanUpdateDTO } from "../dtos/activity.dto";
import { Plan } from "../entity/Plan";
import planService from "../services/plan.service";
import activityService from "../services/activity.service";

class PlanFacade {
	async getPlan(id: number): Promise<Plan> {
		// Gets Plan
		const result = await planService.findPlanById(id);
		return result;
	}

	async editPlan(id: number, newEventUpdated: PlanUpdateDTO, userId: number, isAdmin:boolean): Promise<Plan> {
		// checks if plan exists
		const plan = await planService.findPlanById(id);

		// checks if event exists
		const activity:Activity = plan.activity;
		
		activityService.checkAccess(activity, userId, isAdmin)

		// Updates info
		const result = await planService.editPlan(id, newEventUpdated);
		return result;
	}

	async addPlan(newPlanEntry: NewPlanEntryDTO, isAdmin: boolean): Promise<Plan> {
		let result: Plan;
		if (isAdmin) {
			result = await planService.addPlan({
				...newPlanEntry,
				es_aprobado: true,
			});
		} else {
			result = await planService.addPlan({
				...newPlanEntry,
				es_aprobado: false,

			});
		}
		return result;
	}
}
export default new PlanFacade();
