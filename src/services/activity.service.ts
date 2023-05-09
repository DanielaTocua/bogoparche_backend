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

	async findAllNotApproved(): Promise<Activity[]> {
		console.log("IN FIND ALL NOT APPROVED");
		const notApprovedActivities = (await appDataSource.manager.query(
			`SELECT  id, titulo_actividad, ubicacion, rango_precio, descripcion, restriccion_edad, medio_contacto,id_categoria, es_plan FROM activity WHERE es_aprobado IS false AND es_privada IS false`,
		)) as Activity[];
		return notApprovedActivities;
	}

	async findAllPublic(): Promise<Activity[]> {
		console.log("IN FIND ALL PUBLIC");
		const publicActivities = (await appDataSource.manager.query(
			`SELECT  id, titulo_actividad, ubicacion, rango_precio, descripcion, restriccion_edad, medio_contacto,id_categoria, es_plan FROM activity WHERE es_aprobado IS true AND es_privada IS false`,
		)) as Activity[];
		return publicActivities;
	}

	async deleteActivity(activity: Activity): Promise<Activity> {
		Activity.remove(activity);
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

	// async addAttendance(
	// 	newAttendanceEntry: idActividadDTO,
	// ): Promise<void> {
	// 	const inputErrors = await validate(newAttendanceEntry);
	// 	if (inputErrors.length > 0) {
	// 		console.log(inputErrors);
	// 		throw new ServerError("Invalid form", STATUS_CODES.BAD_REQUEST);
	// 	}
	// 	try {
	// 		const user = await User.findOneByOrFail({
	// 			username: newAttendanceEntry.username,
	// 		});
	// 		console.log({
	// 			id_usuario: user.id,
	// 			id_actividad: newAttendanceEntry.id_actividad
	// 		});
	// 		const newAttendance = Attendance.create({
	// 			id_usuario: user.id,
	// 			id_actividad: newAttendanceEntry.id_actividad,
	// 		});
	// 		await newAttendance.save();
	// 	} catch (error) {
	// 		throw new ServerError("usuario no encontrado", STATUS_CODES.BAD_REQUEST);
	// 	}
	// }

	// async findAttendance(
	// 	newAttendanceEntry: NewAttendanceEntryDTO,
	// ): Promise<any> {
	// 	const inputErrors = await validate(newAttendanceEntry);
	// 	if (inputErrors.length > 0) {
	// 		console.log(inputErrors);
	// 		throw new ServerError("Invalid form", STATUS_CODES.BAD_REQUEST);
	// 	}
	// 	try {
	// 		const user = await User.findOneByOrFail({
	// 			username: newAttendanceEntry.username,
	// 		});
	// 		console.log({
	// 			id_usuario: user.id,
	// 			id_actividad: newAttendanceEntry.id_actividad,
	// 		});
	// 		const AttendanceFind = await Attendance.findOneByOrFail({
	// 			id_usuario: user.id,
	// 			id_actividad: newAttendanceEntry.id_actividad
	// 		});
	// 		const id = AttendanceFind.id;
	// 		console.log(id);
	// 		return id;
	// 	} catch (error) {
	// 		throw new ServerError(
	// 			"Attendance no encontrado",
	// 			STATUS_CODES.BAD_REQUEST,
	// 		);
	// 	}
	// }

	// async findAttendanceById(id: number): Promise<Attendance> {
	// 	if (typeof id != "number") {
	// 		throw new ServerError("Invalid id", STATUS_CODES.BAD_REQUEST);
	// 	}
	// 	try {
	// 		const plan = await Attendance.findOneOrFail({ where: { id: id } });
	// 		return plan;
	// 	} catch {
	// 		throw new ServerError(
	// 			`The Attendance id: ${id} does not exist`,
	// 			STATUS_CODES.BAD_REQUEST,
	// 		);
	// 	}
	// }

	// async deleteAttendance(id: number): Promise<Attendance> {
	// 	if (typeof id != "number") {
	// 		throw new ServerError("Invalid id", STATUS_CODES.BAD_REQUEST);
	// 	}
	// 	const attendance = await this.findAttendanceById(id);
	// 	return Attendance.remove(attendance);
	// }
}
export default new ActivityService();
