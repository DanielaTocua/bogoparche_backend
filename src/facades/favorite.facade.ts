import { ServerError } from "../errors/server.error";
import activityService from "../services/activity.service";
import favoriteService from "../services/favorite.service";
import { STATUS_CODES } from "../utils/constants";

class FavoriteFacade {
	async addFavorites(
		id_usuario: number,
		id_actividad: number,
	): Promise<{ msg: string }> {
		await activityService.findActivityById(id_actividad);
		if (await favoriteService.findFavoriteById(id_usuario, id_actividad)) {
			return { msg: "This favorite already exists" };
		}
		favoriteService.addFavorites(id_usuario, id_actividad);

		return { msg: "Favorite succesfully added" };
	}

	async deleteFavorites(
		id_usuario: number,
		id_actividad: number,
	): Promise<void> {
		const favorite = await favoriteService.findFavoriteById(
			id_usuario,
			id_actividad,
		);
		if (favorite === null) {
			throw new ServerError(
				"This favorite does not exist",
				STATUS_CODES.BAD_REQUEST,
			);
		}
		favoriteService.deleteFavorites(favorite);
	}

	async getFavoriteByActivityId(
		id_usuario: number,
		id_actividad: number,
	): Promise<{ exists: boolean }> {
		await activityService.findActivityById(id_actividad);
		const foundFavorite = await favoriteService.findFavoriteById(
			id_usuario,
			id_actividad,
		);
		return { exists: foundFavorite === null ? false : true };
	}
}

export default new FavoriteFacade();
