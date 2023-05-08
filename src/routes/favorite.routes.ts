import express from "express"; //ESModules

import activityController from "../controllers/activity.controller";
import asyncErrorMiddleware from "../middlewares/asyncError.middleware";
import authMiddleware from "../middlewares/auth.middleware";
import dtoValidationMiddleware from "../middlewares/dtoValidation.middleware";
import { NewFavoriteEntryDTO } from "../dtos/activity.dto";
// import toNewActivityEntry from '../utils/utils_activity'

// Crea router
const router = express.Router();


// Add favorites
router
	.route("")
	.post([authMiddleware, dtoValidationMiddleware(NewFavoriteEntryDTO)], asyncErrorMiddleware(activityController.addFavorites));

// Delete favorites
router
	.route("/:id")
	.delete([authMiddleware], asyncErrorMiddleware(activityController.deleteFavorites));

router
	.route("")
	.get(asyncErrorMiddleware(activityController.getFavorites));


export default router;
