import { NewPlanEntryDTO, PlanUpdateDTO } from "../dtos/activity.dto";
import { Plan } from "../entity/Plan";
import planService from "../services/plan.service";
import userService from "../services/user.service";

class PlanFacade {
	async getPlan(id: number): Promise<Plan> {
		// Gets Plan
		const result = await planService.findPlanById(id);
		return result;
	}

	async editPlan(id: number, newEventUpdated: PlanUpdateDTO): Promise<Plan> {
		// checks if plan exists
		await planService.findPlanById(id);

		// Updates info
		const result = await planService.editPlan(id, newEventUpdated);
		return result;
	}

	async addPlan(
		newPlanEntry: NewPlanEntryDTO,
		isAdmin: boolean,
	): Promise<Plan> {

		// Check captcha
		userService.checkCaptcha(newPlanEntry.captchaToken);
		// Creates new plan
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
