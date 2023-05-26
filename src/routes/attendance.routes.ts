import express from "express"; //ESModules

import attendanceController from "../controllers/attendance.controller";
import { idActividadDTO } from "../dtos/activity.dto";
import asyncErrorMiddleware from "../middlewares/asyncError.middleware";
import authMiddleware from "../middlewares/auth.middleware";
import dtoValidationMiddleware from "../middlewares/dtoValidation.middleware";
import idNumberValidationMiddleware from "../middlewares/idNumberValidation.middleware";
// import toNewActivityEntry from '../utils/utils_activity'

// Crea router
const router = express.Router();

// Add favorites
router
	.route("")
	.post(
		[authMiddleware, dtoValidationMiddleware(idActividadDTO)],
		asyncErrorMiddleware(attendanceController.addAttendance),
	);

// Delete favorites
router
	.route("/:id")
	.delete(
		[authMiddleware, idNumberValidationMiddleware],
		asyncErrorMiddleware(attendanceController.deleteAttendance),
	);

router
	.route("/:id")
	.get(
		[authMiddleware, idNumberValidationMiddleware],
		asyncErrorMiddleware(attendanceController.getAttendanceByActivityId),
	);

export default router;
