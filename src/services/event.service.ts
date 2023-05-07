import { instanceToPlain } from "class-transformer";
import { EventUpdateDTO, NewEventEntryDTO } from "../dtos/activity.dto";
import { Event } from "../entity/Event";
import { ServerError } from "../errors/server.error";
import { STATUS_CODES } from "../utils/constants";
import { Activity } from "../entity/Activity";
import dataSource from "../database/dataSource.";

class EventService {
	// Find Event by Id
	async findEventById(id: number): Promise<any> {
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

	async editEvent(id: number, eventEntry: EventUpdateDTO): Promise<Event> {
		await this.findEventById(id);
		if (typeof id != "number") {
			throw new ServerError("Invalid id", STATUS_CODES.BAD_REQUEST);
		}

		// create a new query runner
		const queryRunner = dataSource.createQueryRunner()

		// establish real database connection
		await queryRunner.connect()

		// open a new transaction:
		await queryRunner.startTransaction()

		try {
			await Activity.update(id, instanceToPlain(eventEntry));
			await Event.update(id, instanceToPlain(eventEntry));

			// commit transaction 
			await queryRunner.commitTransaction()
		} catch (err) {
			// rollback changes we made
			await queryRunner.rollbackTransaction()
		} finally {
			// release query runner
			await queryRunner.release()
		}

		return await Event.findOneOrFail({ where: { id } });
	}

	// Adds the id to the json
	async addEvent(newEventEntry: NewEventEntryDTO): Promise<Event> {
		const newEvent = Event.create(instanceToPlain(newEventEntry));
		return await newEvent.save();
	}

	// Deletes event
	async deleteEvent(id: number): Promise<Event> {
		if (typeof id != "number") {
			throw new ServerError("Invalid id", STATUS_CODES.BAD_REQUEST);
		}

		// Finds Event
		const event = await this.findEventById(id);

		// create a new query runner
		const queryRunner = dataSource.createQueryRunner()

		// establish real database connection
		await queryRunner.connect()

		// open a new transaction:
		await queryRunner.startTransaction()

		try {
			Event.remove(event);
			// commit transaction 
			await queryRunner.commitTransaction()
		} catch(err){
			// rollback changes we made
			await queryRunner.rollbackTransaction()
		} finally {
			// release query runner
			await queryRunner.release()
		}
		
		return event
		
	}
}
export default new EventService();
