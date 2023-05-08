import { Activity } from "../entity/Activity";
import activityService from "../services/activity.service";

class ActivityFacade {
	async deleteActivity(id: number): Promise<Activity> {
		const activity = await activityService.findActivityById(id);
		const result = await activityService.deleteActivity(activity);
		return result;
	}

    async getActivity(id:number):Promise<Activity>{
        const activity = await activityService.findActivityById(id)
        return activity 
    }
}

export default new ActivityFacade();
