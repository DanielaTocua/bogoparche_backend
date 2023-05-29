import { EntityManager } from "typeorm";
import { Visibility } from "../entity/Visibility";
import { appDataSource } from "../dataSource";
import { NewActivityEntryDTO, NewPlanEntryDTO, NewEventEntryDTO } from "../dtos/activity.dto";
import { Activity } from "../entity/Activity";
import { User } from "../entity/User";
import { ServerError } from "../errors/server.error";
import { STATUS_CODES } from "../utils/constants";

class VisibilityService {
	async addVisibility(id_usuario: number, id_actividad: number): Promise<void> {
		const newVisibility = Visibility.create({ id_usuario, id_actividad });
		await newVisibility.save();
	}

	async findVisibilityById(id_usuario: number, id_actividad: number) {
		const visibility = await Visibility.findOneBy({ id_usuario, id_actividad });
		if (visibility === null) {
			throw new ServerError("This visibility does not exist", STATUS_CODES.BAD_REQUEST);
		}
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

	async addVisibilityUser(
		createdActivity:Activity,
		newActivityEntry: NewActivityEntryDTO)
		:Promise<Visibility>{
			const newVisibility = Visibility.create({
					id_actividad:createdActivity.id,
					id_usuario: newActivityEntry.id_usuario,
				});
			return newVisibility
	}
}
export default new VisibilityService();
