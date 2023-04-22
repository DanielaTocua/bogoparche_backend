import { UserPublicDTO, UserRegisterDTO } from "@/dtos/user.dto";

import { GenericResponse } from "../dtos/genericResponse.dto";
import UserService from "../services/user.service";
class UserFacade {
	async registerUser(
		user: UserRegisterDTO,
	): Promise<GenericResponse<UserPublicDTO>> {
		return {
			data: await UserService.registerUser(user),
		};
	}
}

export default new UserFacade();
