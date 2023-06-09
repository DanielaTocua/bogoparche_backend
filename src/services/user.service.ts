import bcrypt from "bcrypt";
import { plainToInstance } from "class-transformer";

import { UserPublicDTO, UserRegisterDTO } from "../dtos/user.dto";
import { User } from "../entity/User";
import { ServerError } from "../errors/server.error";
import { STATUS_CODES } from "../utils/constants";

class UserService {
	async registerUser(user: UserRegisterDTO): Promise<UserPublicDTO> {
		if ((await User.findOneBy({ email: user.email })) != null) {
			throw new ServerError(
				"this email is already registered",
				STATUS_CODES.BAD_REQUEST,
			);
		}

		if ((await User.findOneBy({ username: user.username })) != null) {
			throw new ServerError(
				"this username is already registered",
				STATUS_CODES.BAD_REQUEST,
			);
		}

		const salt = bcrypt.genSaltSync(10);
		const hashedPassword = bcrypt.hashSync(user.password, salt);
		const newUser = User.create({
			username: user.username,
			email: user.email,
			password: hashedPassword,
			isAdmin: user.isAdmin,
		});

		return plainToInstance(UserPublicDTO, await newUser.save(), {
			excludeExtraneousValues: true,
		});
	}

	async getUsernames(): Promise<string[]> {
		const users = await User.find({ select: ["username"] });
		const usernames = users.map((user) => user.username);
		return usernames;
	}

}
export default new UserService();
