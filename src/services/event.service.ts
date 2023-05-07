import { instanceToPlain } from "class-transformer";
import { validate } from "class-validator";

import { EventUpdateDTO, NewEventEntryDTO } from "../dtos/activity.dto";
import { Event } from "../entity/Event";
import { ServerError } from "../errors/server.error";
import { STATUS_CODES } from "../utils/constants";
class EventService {
	// Find Event by Id
	async findEventById(id: number): Promise<any> {
		if (typeof id != "number") {
			throw new ServerError("Invalid id", STATUS_CODES.BAD_REQUEST);
		}
		try {
			const event = await Event.findOneOrFail({ where: { id: id } });
			const eventWithEsPlan = { ...event, es_plan: false };
			return eventWithEsPlan;
		} catch {
			throw new ServerError(
				`The event id: ${id} does not exist`,
				STATUS_CODES.BAD_REQUEST,
			);
		}
	}

	async findEventByTitulo(titulo: string): Promise<Event> {
		if (typeof titulo != "string") {
			throw new ServerError("Invalid title", STATUS_CODES.BAD_REQUEST);
		}
		try {
			const event = await Event.findOneOrFail({
				where: { titulo_actividad: titulo },
			});
			return event;
		} catch {
			throw new ServerError(
				`The event title: ${titulo} does not exist`,
				STATUS_CODES.BAD_REQUEST,
			);
		}
	}

	async editEvent(id: number, eventEntry: EventUpdateDTO): Promise<Event> {
		await this.findEventById(id);
		const inputErrors = await validate(eventEntry);
		if (inputErrors.length > 0) {
			throw new ServerError("Invalid form", STATUS_CODES.BAD_REQUEST);
		}
		await Event.update(id, instanceToPlain(eventEntry));

		return await Event.findOneOrFail({ where: { id } });
	}

	// Adds the id to the json
	async addEvent(newEventEntry: NewEventEntryDTO): Promise<Event> {
		const inputErrors = await validate(newEventEntry);
		if (inputErrors.length > 0) {
			console.log(inputErrors);
			throw new ServerError("Invalid form", STATUS_CODES.BAD_REQUEST);
		}

		const newEvent = Event.create(instanceToPlain(newEventEntry));

		return await newEvent.save();
	}

	// Deletes event
	async deleteEvent(id: number): Promise<Event> {
		if (typeof id != "number") {
			throw new ServerError("Invalid id", STATUS_CODES.BAD_REQUEST);
		}
		const event = await this.findEventById(id);
		return Event.remove(event);
	}
}
export default new EventService();
