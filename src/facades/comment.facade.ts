import { CommentDTO } from "../dtos/comment.dto";
import { Comment } from "../entity/Comment";
import activityService from "../services/activity.service";
import commentService from "../services/comment.service";

class CommentFacade {
	async getComments(id_actividad: number): Promise<any> {
		await activityService.findActivityById(id_actividad);
		const commentsPlan = await commentService.getComments(id_actividad);
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
}

export default new CommentFacade();
