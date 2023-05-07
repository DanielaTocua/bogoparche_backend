import { instanceToPlain, plainToInstance } from "class-transformer";
import { validate } from "class-validator";

import { appDataSource } from "../dataSource";
import {
	EventUpdateDTO,
	NewActivityEntryDTO,
	NewEventEntryDTO,
} from "../dtos/activity.dto";
import { Activity } from "../entity/Activity";
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
			const activity = await Activity.findOneOrFail({
				where: { titulo_actividad: titulo, es_plan: false },
			});
			const event = activity.event;
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
		const newActivityEntry = plainToInstance(
			NewActivityEntryDTO,
			newEventEntry,
			{ excludeExtraneousValues: true },
		);
		try {
			return await appDataSource.manager.transaction(
				async (transactionalEntityManager) => {
					const newActivity = Activity.create(
						instanceToPlain(newActivityEntry),
					);
					const createdActivity = await transactionalEntityManager.save(
						newActivity,
					);
					const newEvent = Event.create({
						id: createdActivity.id,
						fecha_inicio: newEventEntry.fecha_inicio,
						fecha_fin: newEventEntry.fecha_fin,
						hora_inicio: newEventEntry.hora_inicio,
						hora_fin: newEventEntry.hora_fin,
					});
					console.log(newEvent);
					const createdEvent = await transactionalEntityManager.save(newEvent);
					return createdEvent;
				},
			);
		} catch (error) {
			throw new ServerError(
				"There's been an error, try again later",
				STATUS_CODES.INTERNAL_ERROR,
			);
		}
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
