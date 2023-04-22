import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { Token } from "../entity/Token";
import { ServerError } from "../errors/server.error";
import { STATUS_CODES } from "../utils/constants";

export default async (req: Request, res: Response, next: NextFunction) => {
	if (req.body.refresh) {
		const token = req.body.refresh;
		try {
			const decoded = jwt.verify(
				token,
				process.env.JWT_KEY as string,
			) as JwtPayload;
			if (
				decoded.type !== process.env.JWT_REFRESH ||
				decoded.aud !== process.env.JWT_AUDIENCE ||
				decoded.iss !== process.env.JWT_ISSUER
			) {
				next(new ServerError("Invalid token type", STATUS_CODES.UNAUTHORIZED));
			}
			const value = await Token.findOneBy({ token });
			if (value) {
				next(
					new ServerError(
						"Refresh token was already used",
						STATUS_CODES.UNAUTHORIZED,
					),
				);
			}
			req.email = decoded.sub;
			req.username = decoded.name;
			return next();
		} catch (err) {
			next(new ServerError("Invalid jwt token", STATUS_CODES.UNAUTHORIZED));
		}
	}
	next(
		new ServerError("Refresh token is not present", STATUS_CODES.UNAUTHORIZED),
	);
};
