import jwt from "jsonwebtoken";
class LoginService {
	async loginUser(user: any) {
		const body = { id: user.id, email: user.email };
		const token = jwt.sign({ user: body }, "Random string");
		return { token };
	}
}
export default new LoginService();
