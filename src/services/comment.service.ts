import { CommentDTO } from "../dtos/comment.dto";
import { Comment } from "../entity/Comment";

class CommentPlanService {
	// Find Plan by Id
	async getComments(id_actividad: number): Promise<Comment[]> {
		const comments = await Comment.findBy({ id_actividad });
		return comments;
	}

	async addComment(
		id_usuario: number,
		newCommentEntry: CommentDTO,
	): Promise<Comment> {
		const newCommentPlan = Comment.create({ ...newCommentEntry, id_usuario });
		return await newCommentPlan.save();
	}
}
export default new CommentPlanService();
