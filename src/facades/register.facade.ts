import { GenericResponse } from "../dtos/genericResponse.dto";
import UserModel from "../models/user.model";
import registerService from "../services/register.service";
class RegisterFacade {
	async registerUser(
		username: string,
		email: string,
		password: string,
	): Promise<GenericResponse<UserModel>> {
		return {
			data: await registerService.registerUser(username, email, password),
		};
	}
}

export default new RegisterFacade();
