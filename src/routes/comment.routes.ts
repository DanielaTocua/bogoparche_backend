import express from "express"; //ESModules

import commentController from "../controllers/comment.controller";
import { CommentDTO } from "../dtos/comment.dto";
import asyncErrorMiddleware from "../middlewares/asyncError.middleware";
import authMiddleware from "../middlewares/auth.middleware";
import dtoValidationMiddleware from "../middlewares/dtoValidation.middleware";
import idNumberValidationMiddleware from "../middlewares/idNumberValidation.middleware";
import optionalAuthMiddleware from "../middlewares/optionalAuth.middleware";

// Crea router
const router = express.Router();

// Comment
router
	.route("")
	.post(
		[authMiddleware, dtoValidationMiddleware(CommentDTO)],
		asyncErrorMiddleware(commentController.createComment),
	);

// Get Comments
router
	.route("/:id")
	.get(
		[optionalAuthMiddleware, idNumberValidationMiddleware],
		asyncErrorMiddleware(commentController.getCommentsFromTable),
	);

// Delete Comment

router
	.route("/:id")
	.delete(
		[authMiddleware, idNumberValidationMiddleware],
		asyncErrorMiddleware(commentController.deleteComment),
	);

export default router;
