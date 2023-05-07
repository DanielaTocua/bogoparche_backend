import { plainToInstance } from "class-transformer";
import { RequestHandler } from "express";
import { validate, ValidationError } from "class-validator";

import { ServerError } from "../errors/server.error";
import { STATUS_CODES } from "../utils/constants";

function idNumberValidation(): RequestHandler {

  return (req, res, next) => {
    if (typeof req.params.id != "number") {
			next(new ServerError("Invalid id", STATUS_CODES.BAD_REQUEST));
		}
    next();
  }
}
  
export default idNumberValidation;