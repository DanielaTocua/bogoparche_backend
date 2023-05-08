import { validate } from "class-validator";

import { appDataSource } from "../dataSource";
import {
	NewAttendanceEntryDTO,
	NewFavoriteEntryDTO,
} from "../dtos/activity.dto";
import { Activity } from "../entity/Activity";
import { Attendance } from "../entity/Attendance";
import { Category } from "../entity/Category";
import { Favorite } from "../entity/Favorite";
import { User } from "../entity/User";
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
	async findAllPublic(): Promise<Activity[]> {
		console.log("IN FIND ALL PUBLIC");
		// Puede cambiarse a raw queries

		try {
			const publicActivities = (await appDataSource.manager.query(
				`SELECT  id, titulo_actividad, ubicacion, rango_precio, descripcion, restriccion_edad, medio_contacto,id_categoria, es_plan FROM activity WHERE es_aprobado IS true AND es_privada IS false`,
			)) as Activity[];
			return publicActivities;
		} catch (error) {
			throw new ServerError(
				"There's been an error, try again later",
				STATUS_CODES.INTERNAL_ERROR,
			);
		}
	}

	async findAllNotApproved(): Promise<Activity[]> {
		console.log("IN FIND ALL NOT APPROVED");
		// Puede cambiarse a raw queries

		try {
			const notApprovedActivities = (await appDataSource.manager.query(
				`SELECT  id, titulo_actividad, ubicacion, rango_precio, descripcion, restriccion_edad, medio_contacto,id_categoria, es_plan FROM activity WHERE es_aprobado IS false AND es_privada IS false`,
			)) as Activity[];
			return notApprovedActivities;
		} catch (error) {
			throw new ServerError(
				"There's been an error, try again later",
				STATUS_CODES.INTERNAL_ERROR,
			);
		}
	}


	async deleteActivity(activity: Activity): Promise<Activity> {
		try {
			Activity.remove(activity);
		} catch (err) {
			throw new ServerError(
				"There's been an error, try again later",
				STATUS_CODES.BAD_REQUEST,
			);
		}
		return activity;
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

	async addFavorites(id:number, newFavoriteEntry: NewFavoriteEntryDTO): Promise<void> {
		try {
			const user = await User.findOneByOrFail({id});
			console.log({
				id_usuario: user.id,
				id_actividad: newFavoriteEntry.id_actividad,
				es_plan: newFavoriteEntry.es_plan,
			});
			const newFavorite = Favorite.create({
				id_usuario: user.id,
				...newFavoriteEntry
			});
			await newFavorite.save();
		} catch (error) {
			throw new ServerError("usuario no encontrado", STATUS_CODES.BAD_REQUEST);
		}
	}

	async findFavoritesById(id: number): Promise<Favorite> {
		if (typeof id != "number") {
			throw new ServerError("Invalid id", STATUS_CODES.BAD_REQUEST);
		}
		try {
			const plan = await Favorite.findOneOrFail({ where: { id: id } });
			return plan;
		} catch {
			throw new ServerError(
				`The Favorites id: ${id} does not exist`,
				STATUS_CODES.BAD_REQUEST,
			);
		}
	}

	async deleteFavorites(id: number): Promise<Favorite> {
		if (typeof id != "number") {
			throw new ServerError("Invalid id", STATUS_CODES.BAD_REQUEST);
		}
		const favorites = await this.findFavoritesById(id);
		return Favorite.remove(favorites);
	}

	async findFavorites(id:number, newFavoriteEntry: NewFavoriteEntryDTO): Promise<any> {
		const inputErrors = await validate(newFavoriteEntry);
		if (inputErrors.length > 0) {
			console.log(inputErrors);
			throw new ServerError("Invalid form", STATUS_CODES.BAD_REQUEST);
		}
		try {
			const user = await User.findOneByOrFail({
				id: newFavoriteEntry.id_actividad,
			});
			console.log({
				id_usuario: user.id,
				id_actividad: newFavoriteEntry.id_actividad,
				es_plan: newFavoriteEntry.es_plan,
			});
			const FavoriteFind = await Favorite.findOneByOrFail({
				id_usuario: user.id,
				id_actividad: newFavoriteEntry.id_actividad,
				es_plan: newFavoriteEntry.es_plan,
			});
			const id = FavoriteFind.id;
			console.log(id);
			return id;
		} catch (error) {
			throw new ServerError("favorito no encontrado", STATUS_CODES.BAD_REQUEST);
		}
	}

	async addAttendance(
		newAttendanceEntry: NewAttendanceEntryDTO,
	): Promise<void> {
		const inputErrors = await validate(newAttendanceEntry);
		if (inputErrors.length > 0) {
			console.log(inputErrors);
			throw new ServerError("Invalid form", STATUS_CODES.BAD_REQUEST);
		}
		try {
			const user = await User.findOneByOrFail({
				username: newAttendanceEntry.username,
			});
			console.log({
				id_usuario: user.id,
				id_actividad: newAttendanceEntry.id_actividad,
				es_plan: newAttendanceEntry.es_plan,
			});
			const newAttendance = Attendance.create({
				id_usuario: user.id,
				id_actividad: newAttendanceEntry.id_actividad,
				es_plan: newAttendanceEntry.es_plan,
			});
			await newAttendance.save();
		} catch (error) {
			throw new ServerError("usuario no encontrado", STATUS_CODES.BAD_REQUEST);
		}
	}

	async findAttendance(
		newAttendanceEntry: NewAttendanceEntryDTO,
	): Promise<any> {
		const inputErrors = await validate(newAttendanceEntry);
		if (inputErrors.length > 0) {
			console.log(inputErrors);
			throw new ServerError("Invalid form", STATUS_CODES.BAD_REQUEST);
		}
		try {
			const user = await User.findOneByOrFail({
				username: newAttendanceEntry.username,
			});
			console.log({
				id_usuario: user.id,
				id_actividad: newAttendanceEntry.id_actividad,
				es_plan: newAttendanceEntry.es_plan,
			});
			const AttendanceFind = await Attendance.findOneByOrFail({
				id_usuario: user.id,
				id_actividad: newAttendanceEntry.id_actividad,
				es_plan: newAttendanceEntry.es_plan,
			});
			const id = AttendanceFind.id;
			console.log(id);
			return id;
		} catch (error) {
			throw new ServerError(
				"Attendance no encontrado",
				STATUS_CODES.BAD_REQUEST,
			);
		}
	}

	async findAttendanceById(id: number): Promise<Attendance> {
		if (typeof id != "number") {
			throw new ServerError("Invalid id", STATUS_CODES.BAD_REQUEST);
		}
		try {
			const plan = await Attendance.findOneOrFail({ where: { id: id } });
			return plan;
		} catch {
			throw new ServerError(
				`The Attendance id: ${id} does not exist`,
				STATUS_CODES.BAD_REQUEST,
			);
		}
	}

	async deleteAttendance(id: number): Promise<Attendance> {
		if (typeof id != "number") {
			throw new ServerError("Invalid id", STATUS_CODES.BAD_REQUEST);
		}
		const attendance = await this.findAttendanceById(id);
		return Attendance.remove(attendance);
	}
}
export default new ActivityService();
