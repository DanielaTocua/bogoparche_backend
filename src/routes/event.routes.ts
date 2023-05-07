import express from "express"; //ESModules

import activityController from "../controllers/activity.controller";
import commentController from "../controllers/comment.controller";
import eventController from "../controllers/event.controller";
import planController from "../controllers/plan.controller";
import { NewEventEntryDTO, NewPlanEntryDTO } from "../dtos/activity.dto";
import asyncErrorMiddleware from "../middlewares/asyncError.middleware";
import authMiddleware from "../middlewares/auth.middleware";
import dtoValidationMiddleware from "../middlewares/dtoValidation.middleware";
import idNumberValidation from "../middlewares/idNumberValidation.middleware";
// import toNewActivityEntry from '../utils/utils_activity'

// Crea router
const router = express.Router();


// Creates event
router
	.route("/event")
	.post(
		[authMiddleware, dtoValidationMiddleware(NewEventEntryDTO)],
		asyncErrorMiddleware(eventController.addEvent),
	);

export default router;
