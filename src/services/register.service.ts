import UserModel from "../models/user.model";
class RegisterService {
	async registerUser(username: string, email: string, password: string) {
		return await UserModel.createUser(username, email, password);
	}
}
export default new RegisterService();
