
import { TokenDTO, UserAndTokenDTO } from "../dtos/token.dto";
import { UserLoginDTO } from "../dtos/user.dto";
import { Token } from "../entity/Token";
import { User } from "../entity/User";
import { ServerError } from "../errors/server.error";
import { STATUS_CODES } from "../utils/constants";
import jwtService from "./jwt.service";

class AuthService {
	async login(userLoginForm: UserLoginDTO): Promise<UserAndTokenDTO> {
		const user = await User.findOneBy({ email: userLoginForm.email });
		if (user == null) {
			throw new ServerError(
				"this email is not registered",
				STATUS_CODES.BAD_REQUEST,
			);
		}
		if (await user.validatePassword(userLoginForm.password)) {
			const token = jwtService.generate(user.email, user.username);
			return {
				username: user.username,
				access: token.access,
				refresh: token.refresh
			};
		}
		throw new ServerError("Invalid credentials", STATUS_CODES.UNAUTHORIZED);
	}
	async refresh(email: string, name: string, token: string): Promise<TokenDTO> {
		const newUsedToken = Token.create({ token });
		newUsedToken.save();
		return jwtService.generate(email, name);
	}
}
export default new AuthService();
