import { Favorite } from "../entity/Favorite";
import { ServerError } from "../errors/server.error";
import { STATUS_CODES } from "../utils/constants";
import activityService from "./activity.service";

class ActivityService {
	async addFavorites(id_usuario: number, id_actividad: number): Promise<void> {
		await activityService.findActivityById(id_actividad);
		if (await this.findFavoriteById(id_usuario, id_actividad)) {
			return;
		}
		const newFavorite = Favorite.create({ id_usuario, id_actividad });
		await newFavorite.save();
	}

	async findFavoriteById(id_usuario: number, id_actividad: number) {
		const favorite = await Favorite.findOneBy({ id_usuario, id_actividad });
		return favorite;
	}

	async deleteFavorites(
		id_usuario: number,
		id_actividad: number,
	): Promise<void> {
		const favorite = await this.findFavoriteById(id_usuario, id_actividad);
		if (favorite === null) {
			throw new ServerError(
				"This favorite does not exist",
				STATUS_CODES.BAD_REQUEST,
			);
		}
		Favorite.remove(favorite);
	}

	async getFavoriteByActivityId(
		id_usuario: number,
		id_actividad: number,
	): Promise<boolean> {
		await activityService.findActivityById(id_actividad);
		const foundFavorite = await this.findFavoriteById(id_usuario, id_actividad);
		return foundFavorite === null ? false : true;
	}
}
export default new ActivityService();
