import { ServerError } from "../errors/server.error";
import { STATUS_CODES } from "../utils/constants";
import {CommentPlan} from "../entity/CommentPlan";
import { CommentDTO } from "../dtos/comment.dto";
import { validate } from "class-validator";
import { instanceToPlain } from "class-transformer";
import { CommentEvent } from "../entity/CommentEvent";

class CommentPlanService{
// Find Plan by Id
async getCommentsPlan (
	idActividad:number): Promise<CommentPlan[]> {
	
    if (typeof idActividad != "number") {
        throw new ServerError("Invalid id", STATUS_CODES.BAD_REQUEST);
    }
    try {
        const commentsPlan = await CommentPlan.find({ where: { id_actividad:idActividad } });
        return commentsPlan;
    } catch {
        throw new ServerError(
            `The plan id: ${idActividad} does not exist`,
            STATUS_CODES.BAD_REQUEST,
        );
    }
};

async getCommentsEvent (
	idActividad:number): Promise<CommentEvent[]> {
	
    if (typeof idActividad != "number") {
        throw new ServerError("Invalid id", STATUS_CODES.BAD_REQUEST);
    }
    try {
        const commentsPlan = await CommentEvent.find({ where: { id_actividad:idActividad } });
        return commentsPlan;
    } catch {
        throw new ServerError(
            `The plan id: ${idActividad} does not exist`,
            STATUS_CODES.BAD_REQUEST,
        );
    }
};

async addCommentPlan(
    newCommentEntry:CommentDTO
    ): Promise<CommentPlan>{
        const inputErrors = await validate(newCommentEntry);
		if (inputErrors.length > 0) {
			throw new ServerError("Invalid form", STATUS_CODES.BAD_REQUEST);
		}
        const newCommentPlan = CommentPlan.create(instanceToPlain(newCommentEntry))
        return newCommentPlan.save()
};

async addCommentEvent(
    newCommentEntry:CommentDTO
    ): Promise<CommentEvent>{
        const inputErrors = await validate(newCommentEntry);
		if (inputErrors.length > 0) {
			throw new ServerError("Invalid form", STATUS_CODES.BAD_REQUEST);
		}
        const newCommentEvent = CommentEvent.create(instanceToPlain(newCommentEntry))
        return newCommentEvent.save()
};
}
export default new CommentPlanService()

