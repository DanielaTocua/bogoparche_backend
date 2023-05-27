import { User } from "../entity/User";
import { ServerError } from "../errors/server.error";
import activityService from "../services/activity.service";
import visibilityService from "../services/visibility.service";
import { STATUS_CODES } from "../utils/constants";

class VisibilityFacade {
	async addVisibility(
		username: string,
		id_actividad: number,
	): Promise<{ msg: string }> {
		const user = (await User.findBy({ username }))[0];

		if (user === null) {
			throw new ServerError(
				"This user does not exist",
				STATUS_CODES.BAD_REQUEST,
			);
		}

		if (await visibilityService.findVisibilityById(user.id, id_actividad)) {
			return { msg: "This visibility already exists" };
		}
		visibilityService.addVisibility(user.id, id_actividad);

		return { msg: "Visibility succesfully added" };
	}

	async deleteVisibility(
		id_usuario: number,
		id_actividad: number,
	): Promise<void> {
		const visibility = await visibilityService.findVisibilityById(
			id_usuario,
			id_actividad,
		);
		if (visibility === null) {
			throw new ServerError(
				"This visibility does not exist",
				STATUS_CODES.BAD_REQUEST,
			);
		}
		visibilityService.deleteVisibility(visibility);
	}

	async getVisibilityGroup(id_actividad: number) {
		return await visibilityService.findVisibilityGroup(id_actividad);
	}

	async addVisibilityGroup(users: string[], id_actividad: number) {
		await activityService.findActivityById(id_actividad);
		for (let i = 0; i < users.length; i++) {
			await this.addVisibility(users[i], id_actividad);
		}
	}
}

export default new VisibilityFacade();
