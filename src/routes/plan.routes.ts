import express from "express"; //ESModules

import planController from "../controllers/plan.controller";
import { NewPlanEntryDTO } from "../dtos/activity.dto";
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
		[authMiddleware,checkCaptchaMiddleware, dtoValidationMiddleware(NewPlanEntryDTO)],
		asyncErrorMiddleware(planController.addPlan),
	);

// Editing
router
	.route("/:id")
	.put(
		[authMiddleware, idNumberValidationMiddleware, checkAccessMiddleware],
		asyncErrorMiddleware(planController.editPlan),
	);

export default router;
