import jwt from "jsonwebtoken";

import UserModel from "../models/user.model";
class LoginService {
	async loginUser(user: UserModel) {
		const body = { id: user.id, email: user.email };
		const token = jwt.sign({ user: body }, "Random string");
		const username = user.username;

		return { username, token };
	}
}
export default new LoginService();
