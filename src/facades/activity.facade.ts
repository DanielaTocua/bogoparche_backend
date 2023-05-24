import { Activity } from "../entity/Activity";
import activityService from "../services/activity.service";
import commentService from "../services/comment.service";
import eventService from "../services/event.service";
import planService from "../services/plan.service";

class ActivityFacade {

	
	async deleteActivity(id: number): Promise<Activity> {
		const activity = await activityService.findActivityById(id);
		const result = await activityService.deleteActivity(activity);
		return result;
	}

	async deletePrivateActivity(id: number, user_id: number): Promise<Activity> {
		const activity = await activityService.findActivityByIdPrivate(id, user_id);
		const result = await activityService.deleteActivity(activity);
		return result;
	}

	async getActivity(id: number, userId:number|null): Promise<any> {
		
		
		const activity = await activityService.findActivityDetailsById(id,userId);
		await activityService.checkVisibility(userId, activity)
		const comments = await commentService.getComments(id, userId);
		if (activity.es_plan) {
			const plan = await planService.findPlanById(id);
			return { ...activity, ...plan, comments };
		} else {
			const event = await eventService.findEventById(id);
			return { ...activity, ...event, comments };
		}
	}

	async editApproved(id: number) {
		// checks if plan exists
		await activityService.findActivityById(id);

		// Updates info
		await activityService.editApproved(id);
	}

	async publicAtributtesFilter(
		activities:
			| Activity[]
			| (Activity & { attendance: boolean; favorite: boolean })[],
		search: string[],
		rangePrices: string[],
		categories: string[],
	): Promise<
		Activity[] | (Activity & { attendance: boolean; favorite: boolean })[]
	> {
		let filtered = activities;

		// Filter by Price
		filtered = activityService.filterByPrices(rangePrices, filtered);

		// Filter by Categories
		filtered = await activityService.filterByCategory(categories, filtered);

		// Search
		filtered = activityService.searchByWords(search, filtered);

		return filtered;
	}

	async privateFilter(
		id: number,
		favorites: boolean,
		attendance: boolean,
		search: string[],
		rangePrices: string[],
		categories: string[],
	): Promise<(Activity & { attendance: boolean; favorite: boolean })[]> {
		let filtered = await activityService.findAllPublicAuthenticated(id);
		if (favorites) {
			filtered = filtered.filter((activity) => activity.favorite === true);
			console.log(filtered);
			//filtered = activityService.filterByFavorites(filtered);
		}
		if (attendance) {
			filtered = filtered.filter((activity) => activity.attendance === true);
		}
		return (await this.publicAtributtesFilter(
			filtered,
			search,
			rangePrices,
			categories,
		)) as (Activity & { attendance: boolean; favorite: boolean })[];
	}

	async publicFilter(
		search: string[],
		rangePrices: string[],
		categories: string[],
	): Promise<Activity[]> {
		const filtered = await activityService.findAllPublic();

		return (await this.publicAtributtesFilter(
			filtered,
			search,
			rangePrices,
			categories,
		)) as Activity[];
	}
}

export default new ActivityFacade();
