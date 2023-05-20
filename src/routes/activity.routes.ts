import express from "express"; //ESModules

import activityController from "../controllers/activity.controller";
import commentController from "../controllers/comment.controller";
import { CommentDTO } from "../dtos/comment.dto";
import asyncErrorMiddleware from "../middlewares/asyncError.middleware";
import authMiddleware from "../middlewares/auth.middleware";
import dtoValidationMiddleware from "../middlewares/dtoValidation.middleware";
import idNumberValidationMiddleware from "../middlewares/idNumberValidation.middleware";
import validateAdminMiddleware from "../middlewares/validateAdmin.middleware";
// import toNewActivityEntry from '../utils/utils_activity'

// Crea router
const router = express.Router();

// Gets all activities (plan/events)
router.route("/all").get(asyncErrorMiddleware(activityController.getAll));
router
	.route("/all-not-approved")
	.get(asyncErrorMiddleware(activityController.getAllNotApproved));

// Deletes activities
router
	.route("/:id")
	.delete(
		[authMiddleware, validateAdminMiddleware, idNumberValidationMiddleware],
		asyncErrorMiddleware(activityController.deleteActivity),
	);
	
// Filter activities public
router.route("/filter").get(activityController.filterPublic);

router.route("/authfilter").get([authMiddleware],asyncErrorMiddleware(activityController.filterPrivate));
// Gets activities
router
	.route("/:id")
	.get(
		[idNumberValidationMiddleware],
		asyncErrorMiddleware(activityController.getActivity),
	);



// Comment
router
	.route("/comment")
	.post(
		[authMiddleware, dtoValidationMiddleware(CommentDTO)],
		asyncErrorMiddleware(commentController.createComment),
	);

// Get Comments
router
	.route("/get-comments/:id/:es_plan")
	.get(asyncErrorMiddleware(commentController.getCommentsFromTable));

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
