import { instanceToPlain } from "class-transformer";
import { validate } from "class-validator";

import { CommentDTO } from "../dtos/comment.dto";
import { CommentEvent } from "../entity/CommentEvent";
import { CommentPlan } from "../entity/CommentPlan";
import { ServerError } from "../errors/server.error";
import { STATUS_CODES } from "../utils/constants";

class CommentPlanService {
	// Find Plan by Id
	async getCommentsPlan(idActividad: number): Promise<CommentPlan[]> {
		if (typeof idActividad != "number") {
			throw new ServerError("Invalid id", STATUS_CODES.BAD_REQUEST);
		}
		try {
			const commentsPlan = await CommentPlan.find({
				where: { id_actividad: idActividad },
			});
			return commentsPlan;
		} catch {
			throw new ServerError(
				`The plan id: ${idActividad} does not exist`,
				STATUS_CODES.BAD_REQUEST,
			);
		}
	}

	async getCommentsEvent(idActividad: number): Promise<CommentEvent[]> {
		if (typeof idActividad != "number") {
			throw new ServerError("Invalid id", STATUS_CODES.BAD_REQUEST);
		}
		try {
			const commentsPlan = await CommentEvent.find({
				where: { id_actividad: idActividad },
			});
			return commentsPlan;
		} catch {
			throw new ServerError(
				`The plan id: ${idActividad} does not exist`,
				STATUS_CODES.BAD_REQUEST,
			);
		}
	}

	async addCommentPlan(newCommentEntry: CommentDTO): Promise<CommentPlan> {
		const newCommentPlan = CommentPlan.create(newCommentEntry);
		try {
			return newCommentPlan.save();			
		} catch (error) {
			throw new ServerError("There's been an error, try again later", STATUS_CODES.INTERNAL_ERROR)
		}
		
	}

	async addCommentEvent(newCommentEntry: CommentDTO): Promise<CommentEvent> {
		const inputErrors = await validate(newCommentEntry);
		if (inputErrors.length > 0) {
			throw new ServerError("Invalid form", STATUS_CODES.BAD_REQUEST);
		}
		const newCommentEvent = CommentEvent.create(
			instanceToPlain(newCommentEntry),
		);
		return newCommentEvent.save();
	}
}
export default new CommentPlanService();
