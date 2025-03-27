import { NextFunction, Request, Response } from "express";
import fetch from "node-fetch";

import { ServerError } from "../errors/server.error";
import { STATUS_CODES } from "../utils/constants";

export default async (req: Request, res: Response, next: NextFunction) => {
	const captchaToken = req.body.captchaToken;
	if (!captchaToken) {
		next(
			new ServerError("Captcha token is required", STATUS_CODES.BAD_REQUEST),
		);
	}

	// check captcha token
	const secret = process.env.RECAPTCHA_SECRET_KEY;
	const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${captchaToken}`;

	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
		},
	});
	const data = await response.json();
	if (!data.success) {
		next(new ServerError("Captcha error", STATUS_CODES.BAD_REQUEST));
	}
	next();
};
