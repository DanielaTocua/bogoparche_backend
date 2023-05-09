import { Favorite } from "../entity/Favorite";

class ActivityService {
	async addFavorites(id_usuario: number, id_actividad: number): Promise<void> {
		const newFavorite = Favorite.create({ id_usuario, id_actividad });
		await newFavorite.save();
	}

	async findFavoriteById(id_usuario: number, id_actividad: number) {
		const favorite = await Favorite.findOneBy({ id_usuario, id_actividad });
		return favorite;
	}

	async deleteFavorites(favorite: Favorite): Promise<void> {
		Favorite.remove(favorite);
	}
}
export default new ActivityService();
