import { instanceToPlain, plainToInstance } from "class-transformer";

import { appDataSource } from "../dataSource";
import {
	EventUpdateDTO,
	NewActivityEntryDTO,
	NewEventEntryDTO,
} from "../dtos/activity.dto";
import { Activity } from "../entity/Activity";
import { Event } from "../entity/Event";
import { RelatedActivity } from "../entity/RelatedActivity";
import { Visibility } from "../entity/Visibility";
import { ServerError } from "../errors/server.error";
import { STATUS_CODES } from "../utils/constants";
import activityService from "./activity.service";
import imageService from "./image.service";
import { User } from "../entity/User";

class EventService {
	// Find Event by Id
	async findEventById(id: number): Promise<any> {
		try {
			const event = await Event.findOneOrFail({
				where: { id: id },
			});
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
		// create a new query runner
		const queryRunner = appDataSource.createQueryRunner();

		// establish real database connection
		await queryRunner.connect();

		// open a new transaction:
		await queryRunner.startTransaction();

		const activityEntry = plainToInstance(NewActivityEntryDTO, eventEntry, {
			excludeExtraneousValues: true,
		});
		try {
			const oldActivity = await activityService.findActivityById(id);
			
			if (activityEntry.image && !oldActivity.es_privada) {
				const filePath = await imageService.uploadImage(activityEntry.image);
				activityEntry.image = filePath;
				imageService.deleteImage(oldActivity.image);
			}
			await Activity.update(id, instanceToPlain(activityEntry));
			const eventUpdateEntry = {
				fecha_inicio: eventEntry.fecha_inicio,
				fecha_fin: eventEntry.fecha_fin,
				hora_inicio: eventEntry.hora_inicio,
				hora_fin: eventEntry.hora_fin,
			};

			if (!Object.values(eventUpdateEntry).every((el) => el === undefined)) {
				await Event.update(id, eventUpdateEntry);
			}

			// commit transaction
			await queryRunner.commitTransaction();
		} catch (err) {
			// rollback changes we made
			await queryRunner.rollbackTransaction();
			await queryRunner.release();
			throw new ServerError(
				"There's been an error, try again later",
				STATUS_CODES.BAD_REQUEST,
			);
		}
		// release query runner
		await queryRunner.release();

		return await Event.findOneOrFail({ where: { id } });
	}

	// Adds the id to the json
	async addEvent(newEventEntry: NewEventEntryDTO): Promise<Event> {
		const newActivityEntry = plainToInstance(
			NewActivityEntryDTO,
			newEventEntry,
			{ excludeExtraneousValues: true },
		);

		return await appDataSource.manager.transaction(
			async (transactionalEntityManager) => {
				if (newActivityEntry.image && !newEventEntry.es_privada ){
					const filePath = await imageService.uploadImage(newActivityEntry.image);
				newActivityEntry.image = filePath;

				} else {
					newActivityEntry.image = undefined;
				}
				

				const newActivity = Activity.create(instanceToPlain(newActivityEntry));
				const createdActivity = await transactionalEntityManager.save(
					newActivity,
				);

				if (createdActivity.es_privada) {
					const newVisibility = Visibility.create({
						id_actividad: createdActivity.id,
						id_usuario: newActivityEntry.id_usuario,
					});
					await transactionalEntityManager.save(newVisibility);
					if (newEventEntry.users){
						const userIDs = await appDataSource.getRepository(User).createQueryBuilder('user').select('user.id').where('user.username IN (:...usernames)', {usernames: newEventEntry.users}).getMany()
						for (const userID of userIDs){
							const newVisibility = Visibility.create({
								id_actividad: createdActivity.id,
								id_usuario: userID.id,
							});
							console.log("AAA")
							console.log(newVisibility)
							await transactionalEntityManager.save(newVisibility);
						}
					}
					if (
						typeof newActivityEntry.id_related_public_activity != "undefined"
					) {
						const newRelation = RelatedActivity.create({
							id_actividad_privada: createdActivity.id,
							id_actividad_publica: newActivityEntry.id_related_public_activity,
						});
						const createdRelation = await transactionalEntityManager.save(
							newRelation,
						);
					}
				}

				const newEvent = Event.create({
					id: createdActivity.id,
					fecha_inicio: newEventEntry.fecha_inicio,
					fecha_fin: newEventEntry.fecha_fin,
					hora_inicio: newEventEntry.hora_inicio,
					hora_fin: newEventEntry.hora_fin,
				});
				const createdEvent = await transactionalEntityManager.save(newEvent);

				return createdEvent;
			},
		);
	}
}
export default new EventService();
