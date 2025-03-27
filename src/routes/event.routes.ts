import express from "express"; //ESModules

import eventController from "../controllers/event.controller";
import { NewEventEntryDTO } from "../dtos/activity.dto";
import asyncErrorMiddleware from "../middlewares/asyncError.middleware";
import authMiddleware from "../middlewares/auth.middleware";
import checkAccessMiddleware from "../middlewares/checkAccess.middleware";
import checkCaptchaMiddleware from "../middlewares/checkCaptcha.middleware";
import dtoValidationMiddleware from "../middlewares/dtoValidation.middleware";
import idNumberValidationMiddleware from "../middlewares/idNumberValidation.middleware";
// import toNewActivityEntry from '../utils/utils_activity'

// Crea router
const router = express.Router();

// Creation
router
	.route("")
	.post(
		[authMiddleware, dtoValidationMiddleware(NewEventEntryDTO)],
		asyncErrorMiddleware(eventController.addEvent),
	);

// Editing
router
	.route("/:id")
	.put(
		[
			authMiddleware,
			checkCaptchaMiddleware,
			idNumberValidationMiddleware,
			checkAccessMiddleware,
		],
		asyncErrorMiddleware(eventController.editEvent),
	);

export default router;
