import express from "express"; //ESModules

import favoriteController from "../controllers/favorite.controller";
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
		asyncErrorMiddleware(favoriteController.addFavorites),
	);

// Delete favorites
router
	.route("/:id")
	.delete(
		[authMiddleware, idNumberValidationMiddleware],
		asyncErrorMiddleware(favoriteController.deleteFavorites),
	);

router
	.route("/:id")
	.get(
		[authMiddleware, idNumberValidationMiddleware],
		asyncErrorMiddleware(favoriteController.getFavoriteByActivityId),
	);

export default router;
