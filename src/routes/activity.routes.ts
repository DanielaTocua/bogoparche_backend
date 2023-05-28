import express from "express"; //ESModules

import activityController from "../controllers/activity.controller";
import asyncErrorMiddleware from "../middlewares/asyncError.middleware";
import authMiddleware from "../middlewares/auth.middleware";
import checkAccessMiddleware from "../middlewares/checkAccess.middleware";
import idNumberValidationMiddleware from "../middlewares/idNumberValidation.middleware";
import optionalAuthMiddleware from "../middlewares/optionalAuth.middleware";
import validateAdminMiddleware from "../middlewares/validateAdmin.middleware";

// import toNewActivityEntry from '../utils/utils_activity'

// Crea router
const router = express.Router();

// Gets all activities (plan/events)
router.route("/all").get(asyncErrorMiddleware(activityController.getAll));
router
	.route("/all-not-approved")
	.get(asyncErrorMiddleware(activityController.getAllNotApproved));
router
	.route("/all-private")
	.get(
		[authMiddleware],
		asyncErrorMiddleware(activityController.getUserPrivate),
	);

// Deletes activities
router
	.route("/:id")
	.delete(
		[authMiddleware, idNumberValidationMiddleware, checkAccessMiddleware],
		asyncErrorMiddleware(activityController.deleteActivity),
	);

// Gets activities
router
	.route("/:id")
	.get(
		[optionalAuthMiddleware, idNumberValidationMiddleware],
		asyncErrorMiddleware(activityController.getActivity),
	);

router
	.route("/approve/:id")
	.put(
		[authMiddleware, validateAdminMiddleware],
		asyncErrorMiddleware(activityController.editApproved),
	);

// router
// 	.route("/get-favorites")
// 	.post(asyncErrorMiddleware(activityController.getFavorites));

// // Add Attendance
// router
// 	.route("/add-attendances")
// 	.post(asyncErrorMiddleware(activityController.addAttendance));

// router
// 	.route("/delete-attendances/:id")
// 	.delete(asyncErrorMiddleware(activityController.deleteAttendance));

// router
// 	.route("/get-attendances")
// 	.post(asyncErrorMiddleware(activityController.getAttendance));
export default router;
