import { appDataSource } from "../dataSource";
import { Activity } from "../entity/Activity";
import { Category } from "../entity/Category";
import { Favorite } from "../entity/Favorite";
import { ServerError } from "../errors/server.error";
import { STATUS_CODES } from "../utils/constants";

class ActivityService {
	async findActivityById(id: number): Promise<Activity> {
		if (typeof id != "number") {
			throw new ServerError("Invalid id", STATUS_CODES.BAD_REQUEST);
		}
		try {
			const activity = await Activity.findOneByOrFail({ id });
			return activity;
		} catch {
			throw new ServerError(
				`The activity id: ${id} does not exist`,
				STATUS_CODES.BAD_REQUEST,
			);
		}
	}

	async findActivityDetailsById(
		id: number,
		userId: number | null,
	): Promise<Activity & { attendance: boolean; favorite: boolean }> {
		if (typeof id != "number") {
			throw new ServerError("Invalid id", STATUS_CODES.BAD_REQUEST);
		}
		const activity = await appDataSource.manager.query(
			`SELECT activity.id,
			CASE WHEN favorite.id_usuario IS NULL THEN false ELSE true END AS favorite,
			CASE WHEN attendance.id_usuario IS NULL THEN false  ELSE true   END AS attendance,
			titulo_actividad, ubicacion, rango_precio, descripcion, restriccion_edad,
			medio_contacto,id_categoria, activity.es_plan, es_privada
			FROM activity LEFT JOIN favorite ON activity.id=favorite.id_actividad AND  favorite.id_usuario = $1
			LEFT JOIN attendance ON activity.id=attendance.id_actividad AND  attendance.id_usuario = $1 WHERE activity.id = $2`,
			[userId, id],
		);
		if (activity.length == 0) {
			throw new ServerError(
				"the activity does not exist",
				STATUS_CODES.BAD_REQUEST,
			);
		} else {
			return activity[0];
		}
	}

	async findActivityByIdPrivate(
		id: number,
		user_id: number,
	): Promise<Activity> {
		const activity = this.findActivityById(id);
		console.log(await activity);
		const privateActivities = this.findUserPrivate(user_id);
		console.log(await privateActivities);

		const activityIds = (await privateActivities).map(
			(activity) => activity.id,
		);
		const activityInUserPrivate = activityIds.includes((await activity).id);

		// Verificar si 'activity' está dentro de 'privateActivities'
		console.log(activityInUserPrivate);

		if (activityInUserPrivate) {
			return activity;
		} else {
			throw new ServerError(
				`Cannot delete. The id: ${id} does not correspond to any user's activity.`,
				STATUS_CODES.FORBIDDEN,
			);
		}
	}

	async findAllNotApproved(): Promise<Activity[]> {
		console.log("IN FIND ALL NOT APPROVED");
		const notApprovedActivities = (await appDataSource.manager.query(
			`SELECT  id, titulo_actividad, ubicacion, rango_precio, descripcion, restriccion_edad, medio_contacto,id_categoria, es_plan, es_privada FROM activity WHERE es_aprobado IS false AND es_privada IS false`,
		)) as Activity[];
		return notApprovedActivities;
	}

	async editApproved(id: number): Promise<void> {
		console.log("CHANGE IN APPROVE");
		const queryRunner = appDataSource.createQueryRunner();
		await queryRunner.connect();
		await appDataSource.manager.query(
			`UPDATE activity SET es_aprobado=true WHERE id=$1`,
			[id],
		);
		await queryRunner.release();
	}

	async findAllPublic(): Promise<Activity[]> {
		console.log("IN FIND ALL PUBLIC");
		const publicActivities = (await appDataSource.manager.query(
			`SELECT  id, titulo_actividad, ubicacion, rango_precio, descripcion, restriccion_edad, medio_contacto,id_categoria, es_plan, es_privada FROM activity WHERE es_aprobado IS true AND es_privada IS false`,
		)) as Activity[];
		return publicActivities;
	}

	async findUserPrivate(id: number): Promise<Activity[]> {
		console.log("IN FIND USER PRIVATE");
		const privateActivities = (await appDataSource.manager.query(
			`SELECT  id, titulo_actividad, ubicacion, rango_precio, descripcion, restriccion_edad, medio_contacto,id_categoria, es_plan, es_privada FROM activity WHERE es_privada IS true AND id_usuario = $1`,
			[id],
		)) as Activity[];
		return privateActivities;
	}

	async deleteActivity(activity: Activity): Promise<Activity> {
		// create a new query runner
		const queryRunner = appDataSource.createQueryRunner();

		// establish real database connection
		await queryRunner.connect();

		// open a new transaction:
		await queryRunner.startTransaction();

		await Activity.remove(activity);

		// commit transaction
		await queryRunner.commitTransaction();
		// release query runner
		await queryRunner.release();

		return activity;
	}

	async findAllPublicAuthenticated(
		id: number,
	): Promise<(Activity & { attendance: boolean; favorite: boolean })[]> {
		// Puede cambiarse a raw queries

		const publicActivities = (await appDataSource.manager.query(
			`SELECT activity.id,
				CASE WHEN favorite.id_usuario IS NULL THEN false ELSE true END AS favorite,
				CASE WHEN attendance.id_usuario IS NULL THEN false  ELSE true   END AS attendance,
				titulo_actividad, ubicacion, rango_precio, descripcion, restriccion_edad,
				medio_contacto,id_categoria, activity.es_plan, es_privada
				FROM activity LEFT JOIN favorite ON activity.id=favorite.id_actividad AND  favorite.id_usuario = $1
				LEFT JOIN attendance ON activity.id=attendance.id_actividad AND  attendance.id_usuario = $1 WHERE es_aprobado IS true AND es_privada IS false`,
			[id],
		)) as (Activity & { attendance: boolean; favorite: boolean })[];
		return publicActivities;
	}

	async findCategory(nombre_categoria: string) {
		if (typeof nombre_categoria != "string" || nombre_categoria == "") {
			throw new ServerError("Invalid category name", STATUS_CODES.BAD_REQUEST);
		}
		try {
			const categoria = Category.findOneByOrFail({ nombre_categoria });
			return categoria;
		} catch {
			throw new ServerError(
				`There is no category ${nombre_categoria}`,
				STATUS_CODES.BAD_REQUEST,
			);
		}
	}

	filterByPrices(rangePrices: string[], filtered: any[]) {
		const filteredByPrice: any[] = [];
		if (rangePrices.length != 0) {
			for (let i = 0; i < rangePrices.length; i++) {
				const filteredPriceI = filtered.filter(
					(activity) => activity.rango_precio == rangePrices[i],
				);
				for (let n = 0; n < filteredPriceI.length; n++) {
					filteredByPrice.push(filteredPriceI[n]);
				}
			}
			filtered = filteredByPrice;
		}
		return filtered;
	}

	async filterByCategory(categories: string[], filtered: any[]) {
		const filteredByCateg: any[] = [];
		if (categories.length != 0) {
			for (let i = 0; i < categories.length; i++) {
				const id_categoria = (await this.findCategory(categories[i])).id;
				const filteredCategI = filtered.filter(
					(activity) => activity.id_categoria === id_categoria,
				);
				for (let n = 0; n < filteredCategI.length; n++) {
					filteredByCateg.push(filteredCategI[n]);
				}
			}
			filtered = filteredByCateg;
		}
		return filtered;
	}

	/*
	filterByFavorites(filtered: any[]) {
		const filteredByCateg: any[] = [];
				const id_categoria = (await this.findCategory(categories[i])).id;
				const filteredCategI = filtered.filter(
					(activity) => activity.id_categoria === id_categoria,
				);
				for (let n = 0; n < filteredCategI.length; n++) {
					filteredByCateg.push(filteredCategI[n]);
				}
			filtered = filteredByCateg;
		return filtered;
	}
	*/

	searchByWords(search: string[], filtered: any[]) {
		if (search.length != 0) {
			for (let i = 0; i < search.length; i++) {
				filtered = filtered.filter(
					(activity) =>
						String(activity.titulo_actividad)
							.toLowerCase()
							.includes(String(search[i]).toLowerCase()) ||
						String(activity.descripcion)
							.toLowerCase()
							.includes(String(search[i]).toLowerCase()) ||
						String(activity.ubicacion)
							.toLowerCase()
							.includes(String(search[i]).toLowerCase()),
				);
			}
		}
		return filtered;
	}

	async addFavorites(id_usuario: number, id_actividad: number): Promise<void> {
		if (await Favorite.findOneBy({ id_usuario, id_actividad })) {
			return;
		}
		const newFavorite = Favorite.create({ id_usuario, id_actividad });
		await newFavorite.save();
	}

	async deleteFavorites(
		id_usuario: number,
		id_actividad: number,
	): Promise<void> {
		const favorite = await Favorite.findOneBy({ id_actividad, id_usuario });
		if (favorite === null) {
			throw new ServerError(
				"This favorite does not exist",
				STATUS_CODES.BAD_REQUEST,
			);
		}
		Favorite.remove(favorite);
	}

	async getFavoritebyActivityId(
		id_usuario: number,
		id_actividad: number,
	): Promise<boolean> {
		const foundFavorite = await Favorite.findOneBy({
			id_usuario,
			id_actividad,
		});
		return foundFavorite === null ? true : false;
	}
}
export default new ActivityService();
