import { CommentDTO } from "../dtos/comment.dto";
import { Comment } from "../entity/Comment";
import { ServerError } from "../errors/server.error";
import activityService from "../services/activity.service";
import commentService from "../services/comment.service";
import { STATUS_CODES } from "../utils/constants";

class CommentFacade {
	async getComments(id_actividad: number, userId: number | null): Promise<Comment[]> {
		await activityService.findActivityById(id_actividad);
		const commentsPlan = await commentService.getComments(id_actividad, userId);
		return commentsPlan;
	}

	async addComment(
		userId: number,
		newCommentEntry: CommentDTO,
	): Promise<Comment> {
		await activityService.findActivityById(newCommentEntry.id_actividad);
		const newComment = commentService.addComment(userId, newCommentEntry);
		return newComment;
	}

	async deleteComment(id_comentario: number, userId: number): Promise<void> {
		//Check if comment exists
		const comentario = await commentService.findCommentById(id_comentario);

		if (comentario.id_usuario != userId) {
			throw new ServerError(
				`The comment id: ${id_comentario} does not belong to the user`,
				STATUS_CODES.FORBIDDEN,
			);
		}

		await commentService.deleteComment(comentario);
	}
}

export default new CommentFacade();
