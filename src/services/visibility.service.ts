import { EntityManager } from "typeorm";
import { Visibility } from "../entity/Visibility";
import { appDataSource } from "../dataSource";
import { NewActivityEntryDTO, NewPlanEntryDTO, NewEventEntryDTO } from "../dtos/activity.dto";
import { Activity } from "../entity/Activity";
import { User } from "../entity/User";

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

	async addVisibilityUsers(
		transactionalEntityManager: EntityManager,
		createdActivity:Activity,
		newActivityEntry: NewActivityEntryDTO,
		newEvent_PlanEntry: NewPlanEntryDTO|NewEventEntryDTO)
		:Promise<void>{
		if (createdActivity.es_privada) {
			const newVisibility = this.addVisibility(
				createdActivity.id,
				newActivityEntry.id_usuario,
			);
			await transactionalEntityManager.save(newVisibility);
			if (newEvent_PlanEntry.users){
				if (newEvent_PlanEntry.users.length > 0){
					const userIDs = await appDataSource.getRepository(User).createQueryBuilder('user').select('user.id').where('user.username IN (:...usernames)', {usernames: newEvent_PlanEntry.users}).getMany()
					for (const userID of userIDs){
						const newVisibility = this.addVisibility(
							createdActivity.id,
							userID.id,
						);
						await transactionalEntityManager.save(newVisibility);
					}
				}
		}
	}
}
}
export default new VisibilityService();
