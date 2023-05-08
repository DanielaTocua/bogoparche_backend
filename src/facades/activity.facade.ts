import { Activity } from "../entity/Activity";
import activityService from "../services/activity.service";
import eventService from "../services/event.service";
import planService from "../services/plan.service";

class ActivityFacade {
	async deleteActivity(id: number): Promise<Activity> {
		const activity = await activityService.findActivityById(id);
		const result = await activityService.deleteActivity(activity);
		return result;
	}

	async getActivity(id: number): Promise<any> {
		const activity = await activityService.findActivityById(id);
		if (activity.es_plan) {
			const plan = await planService.findPlanById(id);
			return { ...activity, ...plan };
		} else {
			const event = await eventService.findEventById(id);
			return { ...activity, ...event };
		}
	}
}

export default new ActivityFacade();
