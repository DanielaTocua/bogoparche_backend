import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { User } from "../entity/User";
import { ServerError } from "../errors/server.error";
import { STATUS_CODES } from "../utils/constants";

export default async (req: Request, res: Response, next: NextFunction) => {
	if (req.headers.authorization) {
		const fullToken = req.headers.authorization as string;
		const [bearerToken, token] = fullToken.split(" ");
		if (bearerToken === "Bearer") {
			try {
				const decoded = jwt.verify(
					token,
					process.env.JWT_KEY as string,
				) as jwt.JwtPayload;
				if (
					decoded.type !== process.env.JWT_ACCESS ||
					decoded.aud !== process.env.JWT_AUDIENCE ||
					decoded.iss !== process.env.JWT_ISSUER
				) {
					next(
						new ServerError("Invalid token type", STATUS_CODES.UNAUTHORIZED),
					);
				}
				req.email = decoded.sub;
				req.username = decoded.username;
				const user = await User.findOneByOrFail({ email: decoded.sub});
				req.userId = user.id;
				req.isAdmin = user.isAdmin;
				return next();
			} catch (err) {
				return next();
			}
		}
		return next();
	}
	return next();
};
