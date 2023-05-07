import express from "express"; //ESModules

import activityController from "../controllers/activity.controller";
import commentController from "../controllers/comment.controller";
import eventController from "../controllers/event.controller";
import planController from "../controllers/plan.controller";
import {
	ActivityUpdateDTO,
	NewEventEntryDTO,
	NewPlanEntryDTO,
} from "../dtos/activity.dto";
import { CommentDTO } from "../dtos/comment.dto";
import asyncErrorMiddleware from "../middlewares/asyncError.middleware";
import authMiddleware from "../middlewares/auth.middleware";
import dtoValidationMiddleware from "../middlewares/dtoValidation.middleware";
// import toNewActivityEntry from '../utils/utils_activity'

// Crea router
const router = express.Router();

// Gets all activities (plan/events)
router
	.route("/activities")
	.get(asyncErrorMiddleware(activityController.getAll));

// Creates activities
router
	.route("/plan")
	.post(
		[authMiddleware, dtoValidationMiddleware(NewPlanEntryDTO)],
		asyncErrorMiddleware(planController.addPlan),
	);

router
	.route("/event")
	.post(
		[authMiddleware, dtoValidationMiddleware(NewEventEntryDTO)],
		asyncErrorMiddleware(eventController.addEvent),
	);

//router.route("/create-activity").post([authMiddleware,], asyncErrorMiddleware(activityController.addActivity));

//router.route("/create-activity-suggestion").post([authMiddleware],asyncErrorMiddleware(activityController.addActivity));

// Edit activities
router
	.route("/edit-activity/:id/:es_plan")
	.put(
		[dtoValidationMiddleware(ActivityUpdateDTO)],
		asyncErrorMiddleware(activityController.editActivity),
	);

// Deletes activities
router
	.route("/delete-activity/:id/:es_plan")
	.delete(asyncErrorMiddleware(activityController.deleteActivity));

// Gets activities
router
	.route("/get-activity/:id/:es_plan")
	.get(asyncErrorMiddleware(activityController.getActivity));

// Filter activities
router.route("/filter").get(activityController.filter);

// Add favorites
router
	.route("/add-favorites")
	.post(asyncErrorMiddleware(activityController.addFavorites));

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

// Delete favorites
router
	.route("/delete-favorites/:id")
	.delete(asyncErrorMiddleware(activityController.deleteFavorites));

router
	.route("/get-favorites")
	.post(asyncErrorMiddleware(activityController.getFavorites));

// Add Attendance
router
	.route("/add-attendances")
	.post(asyncErrorMiddleware(activityController.addAttendance));

router
	.route("/delete-attendances/:id")
	.delete(asyncErrorMiddleware(activityController.deleteAttendance));

router
	.route("/get-attendances")
	.post(asyncErrorMiddleware(activityController.getAttendance));
export default router;
