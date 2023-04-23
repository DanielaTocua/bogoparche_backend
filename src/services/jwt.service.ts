import jwt from "jsonwebtoken";
import process from "process";

import { TokenDTO } from "../dtos/token.dto";
class JwtService {
	generate(email: string, username: string): TokenDTO {
		const access = jwt.sign(
			{
<<<<<<< HEAD
				username: username,
=======
				name: username,
>>>>>>> 7a99664b067eb018fba5ca9bb0f8c9e0df84186c
				type: process.env.JWT_ACCESS,
			},
			process.env.JWT_KEY as string,
			{
				subject: email,
				expiresIn: parseInt(process.env.JWT_ACCESS_TIME as string, 10),
				audience: process.env.JWT_AUDIENCE,
				issuer: process.env.JWT_ISSUER,
			},
		);
		const refresh = jwt.sign(
			{
<<<<<<< HEAD
				username: username,
=======
				name: username,
>>>>>>> 7a99664b067eb018fba5ca9bb0f8c9e0df84186c
				type: process.env.JWT_REFRESH,
			},
			process.env.JWT_KEY as string,
			{
				subject: email,
				expiresIn: parseInt(process.env.JWT_REFRESH_TIME as string, 10),
				audience: process.env.JWT_AUDIENCE,
				issuer: process.env.JWT_ISSUER,
			},
		);
		return { access, refresh };
	}
}

export default new JwtService();
