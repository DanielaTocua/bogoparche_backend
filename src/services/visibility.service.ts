import { Visibility } from "../entity/Visibility";

class VisibilityService {
	async addVisibility(id_usuario: number, id_actividad: number): Promise<void> {
		const newVisibility = Visibility.create({ id_usuario, id_actividad });
		await newVisibility.save();
	}

	async findVisibilityById(id_usuario: number, id_actividad: number) {
		const visibility = await Visibility.findOneBy({ id_usuario, id_actividad });
		return visibility;
	}

	async findVisibilityGroup(id_actividad: number) {
		const visibilityList = await Visibility.findBy({ id_actividad });
		return visibilityList;
	}

	async deleteVisibility(visibility: Visibility): Promise<void> {
		await Visibility.remove(visibility);
	}
}
export default new VisibilityService();
