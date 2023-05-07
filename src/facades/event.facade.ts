import { EventUpdateDTO, NewEventEntryDTO } from "@/dtos/activity.dto";

import { Event } from "../entity/Event";
import eventService from "../services/event.service";

class EventFacade {
	async getEvent(id: number): Promise<Event> {
		const result = await eventService.findEventById(id);
		return result;
	}

	async deleteEvent(id: number): Promise<Event> {
		const result = await eventService.deleteEvent(id);
		return result;
	}

	async editEvent(id: number, newEventUpdated: EventUpdateDTO): Promise<Event> {
		// Updates info
		const result = await eventService.editEvent(id, newEventUpdated);
		return result;
	}

	async addEvent(
		newEventEntry: NewEventEntryDTO,
		isAdmin: boolean,
	): Promise<Event> {
		// Creates an event

		let result: Event;
		if (isAdmin) {
			result = await eventService.addEvent({
				...newEventEntry,
				es_aprobado: true,
			});
		} else {
			result = await eventService.addEvent({
				...newEventEntry,
				es_aprobado: false,
			});
		}
		return result;
	}
}

export default new EventFacade();
