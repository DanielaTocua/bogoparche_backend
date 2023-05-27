import express from "express"; //ESModules

import visibilityController from "../controllers/visibility.controller";
import { UserListDTO } from "../dtos/activity.dto";
import asyncErrorMiddleware from "../middlewares/asyncError.middleware";
import authMiddleware from "../middlewares/auth.middleware";
import checkAccessMiddleware from "../middlewares/checkAccess.middleware";
import dtoValidationMiddleware from "../middlewares/dtoValidation.middleware";
import idNumberValidationMiddleware from "../middlewares/idNumberValidation.middleware";
// import toNewActivityEntry from '../utils/utils_activity'

// Crea router
const router = express.Router();

// Add favorites
router
	.route("/group/:id")
	.post(
		[
			authMiddleware,
			checkAccessMiddleware,
			idNumberValidationMiddleware,
			dtoValidationMiddleware(UserListDTO),
		],
		asyncErrorMiddleware(visibilityController.addVisibilityGroup),
	);

// Delete favorites
router
	.route("/:id")
	.delete(
		[authMiddleware, checkAccessMiddleware, idNumberValidationMiddleware],
		asyncErrorMiddleware(visibilityController.deleteVisibility),
	);

export default router;
