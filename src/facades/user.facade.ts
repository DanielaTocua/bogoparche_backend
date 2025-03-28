import { UserPublicDTO, UserRegisterDTO } from "../dtos/user.dto";
import UserService from "../services/user.service";
class UserFacade {
	async registerUser(user: UserRegisterDTO): Promise<UserPublicDTO> {
		return await UserService.registerUser(user);
	}
	async getUsernames(): Promise<string[]> {
		return await UserService.getUsernames();
	}
}

export default new UserFacade();
