import { instanceToPlain, plainToInstance } from "class-transformer";

import { appDataSource } from "../dataSource";
import {
	ActivityUpdateDTO,
	NewActivityEntryDTO,
	NewPlanEntryDTO,
	PlanUpdateDTO,
} from "../dtos/activity.dto";
import { Activity } from "../entity/Activity";
import { Plan } from "../entity/Plan";
import { User } from "../entity/User";
import { Visibility } from "../entity/Visibility";
import { ServerError } from "../errors/server.error";
import { STATUS_CODES } from "../utils/constants";
import activityService from "./activity.service";
import imageService from "./image.service";
import visibilityService from "./visibility.service";

class PlanService {
	// Find Plan by Id
	async findPlanById(id: number): Promise<any> {
		if (typeof id != "number") {
			throw new ServerError("Invalid id", STATUS_CODES.BAD_REQUEST);
		}
		try {
			const plan = await Plan.findOneOrFail({
				where: { id: id },
			});
			const planWithEsPlan = { ...plan, es_plan: true };
			return planWithEsPlan;
		} catch {
			throw new ServerError(
				`The plan id: ${id} does not exist`,
				STATUS_CODES.BAD_REQUEST,
			);
		}
	}

	// Adds the id to the json
	async addPlan(newPlanEntry: NewPlanEntryDTO): Promise<Plan> {
		const newActivityEntry = plainToInstance(
			NewActivityEntryDTO,
			newPlanEntry,
			{ excludeExtraneousValues: true },
		);
		return await appDataSource.manager.transaction(
			async (transactionalEntityManager) => {
				// Image
				const newActivityEntryWithImage =
					await activityService.defineImageInActivityEntry(
						newActivityEntry,
						newPlanEntry,
					);

				// Creates Activity
				const newActivity = await activityService.addActivity(
					newActivityEntryWithImage,
				);
				const createdActivity = await transactionalEntityManager.save(
					newActivity,
				);

				if (createdActivity.es_privada) {
					// Creates Visibility
					const newVisibility = await visibilityService.addVisibilityUser(
						createdActivity,
						newActivityEntryWithImage,
					);
					await transactionalEntityManager.save(newVisibility);
					if (newPlanEntry.users) {
						if (newPlanEntry.users.length > 0) {
							const userIDs = await appDataSource
								.getRepository(User)
								.createQueryBuilder("user")
								.select("user.id")
								.where("user.username IN (:...usernames)", {
									usernames: newPlanEntry.users,
								})
								.getMany();
							for (const userID of userIDs) {
								const newVisibility = Visibility.create({
									id_actividad: createdActivity.id,
									id_usuario: userID.id,
								});
								await transactionalEntityManager.save(newVisibility);
							}
						}
					}
					// Creates Related Activities
					if (
						typeof newActivityEntry.id_related_public_activity != "undefined"
					) {
						const newRelation = await activityService.addRelatedActivity(
							createdActivity,
							newActivityEntryWithImage,
						);
						await transactionalEntityManager.save(newRelation);
					}
				}

				const newPlan = Plan.create({
					id: createdActivity.id,
					horario_plan: newPlanEntry.horario_plan,
				});

				const createdPlan = await transactionalEntityManager.save(newPlan);

				return createdPlan;
			},
		);
	}

	// Edits Plan
	async editPlan(id: number, planEntry: PlanUpdateDTO): Promise<Plan> {
		// create a new query runner
		const queryRunner = appDataSource.createQueryRunner();

		// establish real database connection
		await queryRunner.connect();

		// open a new transaction:
		await queryRunner.startTransaction();

		const activityEntry = plainToInstance(ActivityUpdateDTO, planEntry, {
			excludeExtraneousValues: true,
		});

		const oldActivity = await activityService.findActivityById(id);

		try {
			if (oldActivity.es_privada) {
				const visibilityList = (
					await visibilityService.findVisibilityGroup(id)
				).map((visibility) => visibility.id_usuario);

				let userIDs: number[] = [];
				if (planEntry.users.length > 0) {
					userIDs = (
						await appDataSource
							.getRepository(User)
							.createQueryBuilder("user")
							.select("user.id")
							.where("user.username IN (:...usernames)", {
								usernames: planEntry.users,
							})
							.getMany()
					).map((user) => user.id);
				}
				userIDs.push(oldActivity.id_usuario);

				const visibilityIDsToAdd = userIDs.filter(
					(userID) => !visibilityList.includes(userID),
				);

				const visibilityIDsToDelete = visibilityList
					.filter((userID) => !userIDs.includes(userID))
					.filter(function (el) {
						return el != oldActivity.id_usuario;
					});

				for (const userID of visibilityIDsToAdd) {
					const visibilityExists = await Visibility.find({
						where: { id_actividad: id, id_usuario: userID },
					});
					if (!visibilityExists[0]) {
						const newVisibility = Visibility.create({
							id_actividad: id,
							id_usuario: userID,
						});
						await newVisibility.save();
					}
				}
				if (visibilityIDsToDelete.length > 0) {
					await appDataSource
						.createQueryBuilder()
						.delete()
						.from(Visibility)
						.where("id_actividad = :id AND id_usuario IN (:...userIDs)", {
							id,
							userIDs: visibilityIDsToDelete,
						})
						.execute();
				}

				activityEntry.image = undefined;
			} else {
				console.log("aaaa");
				if (activityEntry.image) {
					console.log("bbbb");
					const filePath = await imageService.uploadImage(activityEntry.image);
					activityEntry.image = filePath;
					if (oldActivity.image) {
						imageService.deleteImage(oldActivity.image);
					}
				}
			}
			await Activity.update(id, instanceToPlain(activityEntry));
			const planUpdateEntry = { horario_plan: planEntry.horario_plan };

			if (!Object.values(planUpdateEntry).every((el) => el === undefined)) {
				await Plan.update(id, planUpdateEntry);
			}

			// commit transaction
			await queryRunner.commitTransaction();
		} catch (err) {
			// rollback changes we made
			await queryRunner.rollbackTransaction();
			await queryRunner.release();
			console.log(err);
			throw new ServerError(
				"There's been an error, try again later",
				STATUS_CODES.BAD_REQUEST,
			);
		}
		// release query runner
		await queryRunner.release();

		return await Plan.findOneOrFail({ where: { id } });
	}
}

export default new PlanService();
