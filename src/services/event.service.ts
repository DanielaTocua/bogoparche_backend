import { instanceToPlain, plainToInstance } from "class-transformer";

import { appDataSource } from "../dataSource";
import {
	ActivityUpdateDTO,
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
import visibilityService from "./visibility.service";

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

		const activityEntry = plainToInstance(ActivityUpdateDTO, eventEntry, {
			excludeExtraneousValues: true,
		});
		try {
			const oldActivity = await activityService.findActivityById(id);
			if (oldActivity.es_privada) {
				
				
				if (eventEntry.users.length > 0){
					const userIDs = await appDataSource.getRepository(User).createQueryBuilder('user').select('user.id').where('user.username IN (:...usernames)', {usernames: eventEntry.users}).getMany()
					for (const userID of userIDs){
						const visibilityExists = (await Visibility.find({where:{id_actividad: id, id_usuario: userID.id}}))
						if (!visibilityExists[0]){
							const newVisibility = Visibility.create({
								id_actividad: id,
								id_usuario: userID.id,
							});
							await newVisibility.save();
						}
					}
				}
				activityEntry.image = undefined;
			} else {
				if (eventEntry.image) {
					const filePath = await imageService.uploadImage(eventEntry.image);
					activityEntry.image = filePath;
					if (oldActivity.image){
						imageService.deleteImage(oldActivity.image);
					}
				}
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
				// Image
				const newActivityEntryWithImage = await activityService.defineImageInActivityEntry(newActivityEntry,newEventEntry)
				
				// Creates Activity
				const createdActivity = await activityService.addActivity(transactionalEntityManager, newActivityEntryWithImage)
					
				// Creates Visibility
				visibilityService.addVisibilityUsers(transactionalEntityManager,createdActivity,newActivityEntryWithImage,newEventEntry)
			
				// Creates Related Activities
				activityService.addRelatedActivity(transactionalEntityManager,createdActivity, newActivityEntryWithImage)

				// Creates Event
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
