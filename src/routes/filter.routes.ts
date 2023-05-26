import express from "express"; //ESModules

import activityController from "../controllers/activity.controller";
import asyncErrorMiddleware from "../middlewares/asyncError.middleware";
import authMiddleware from "../middlewares/auth.middleware";

// Crea router
const router = express.Router();

// Filter activities public

router
	.route("/auth")
	.get(
		[authMiddleware],
		asyncErrorMiddleware(activityController.filterPrivate),
	);

router.route("/noauth").get(activityController.filterPublic);

export default router;
