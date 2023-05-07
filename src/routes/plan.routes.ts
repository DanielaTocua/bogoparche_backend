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
import validateAdminMiddleware from "../middlewares/validateAdmin.middleware";
// import toNewActivityEntry from '../utils/utils_activity'

// Crea router
const router = express.Router();


// Creation
router
	.route("")
	.post(
		[authMiddleware, dtoValidationMiddleware(NewPlanEntryDTO)],
		asyncErrorMiddleware(planController.addPlan),
	);

// Editing
router
	.route("/:id")
	.put(
		[authMiddleware, validateAdminMiddleware, idNumberValidation],
		asyncErrorMiddleware(planController.editPlan),
	);




export default router;
