import { EventUpdateDTO, NewEventEntryDTO } from "../dtos/activity.dto";

import { Event } from "../entity/Event";
import eventService from "../services/event.service";
import activityService from "../services/activity.service";
import { Activity } from "../entity/Activity";
class ActivityFacade {
	async deleteActivity(id: number): Promise<Activity> {
        const activity = await activityService.findActivityById(id)
		const result = await activityService.deleteActivity(activity);
		return result;
	}

	async editEvent(id: number, newEventUpdated: EventUpdateDTO): Promise<Event> {
		// Updates info
		const result = await eventService.editEvent(id, newEventUpdated);
		return result;
	}


}

export default new ActivityFacade();
