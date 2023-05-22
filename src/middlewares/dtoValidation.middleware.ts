import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { RequestHandler } from "express";

import { ServerError } from "../errors/server.error";
import { STATUS_CODES } from "../utils/constants";

function dtoValidationMiddleware<T>(
	dtoType: new () => T,
	skipMissingProperties = false,
): RequestHandler {
	return (req, res, next) => {
		const dtoObj = plainToInstance(dtoType, req.body, {
			excludeExtraneousValues: true,
		});
		validate(dtoObj as object, { skipMissingProperties }).then(
			(errors: ValidationError[]) => {
				if (errors.length > 0) {
					const dtoErrors = errors
						.map((error: ValidationError) =>
							(Object as any).values(error.constraints),
						)
						.join(", ");
					next(new ServerError(dtoErrors, STATUS_CODES.BAD_REQUEST));
				} else {
					req.body = dtoObj;
					next();
				}
			},
		);
	};
}

export default dtoValidationMiddleware;
