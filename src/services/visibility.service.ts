import { appDataSource } from "../dataSource";
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
		const visibilityList = await appDataSource.manager.query(`SELECT bgp_user.username, bgp_user.id as id_usuario
		FROM activity INNER JOIN visibility ON activity.id=visibility.id_actividad
		RIGHT JOIN bgp_user ON visibility.id_usuario=bgp_user.id  WHERE activity.id = $1`,
		[id_actividad],) as {username: string, id_usuario:number}[];


		return visibilityList;
	}

	async deleteVisibility(visibility: Visibility): Promise<void> {
		await Visibility.remove(visibility);
	}
}
export default new VisibilityService();
