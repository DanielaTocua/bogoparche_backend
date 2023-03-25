import express from "express"; //ESModules

import activityController from "../controllers/activity.controller";
import eventController from "../controllers/event.controller";
import planController from "../controllers/plan.controller";
import asyncErrorMiddleware from "../middlewares/asyncError.middleware";
// import toNewActivityEntry from '../utils/utils_activity'

// Crea router
const router = express.Router();

// Gets all activities (plan/events)
router.route("/activities").get(activityController.getAll);

router
	.route("/create-activity")
	.post(asyncErrorMiddleware(activityController.addActivity));

router.route("/create-activity-suggestion")
	.post(asyncErrorMiddleware(activityController.addActivity));

router
	.route("/plan/:id")
	// Get Plan
	.get(asyncErrorMiddleware(planController.getPlan))
	// Delete Plan
	.delete(asyncErrorMiddleware(planController.deletePlan));

router
	.route("/event/:id")
	// Get Event
	.get(asyncErrorMiddleware(eventController.getEvent))
	// Delete event
	.delete(asyncErrorMiddleware(eventController.deleteEvent));

// Create Plan
router.route("/plan").post(asyncErrorMiddleware(planController.addPlan));


// Create Event
router.route("/event").post(asyncErrorMiddleware(eventController.addEvent));


router.route('/filter')
    .get(activityController.filter);

export default router;

