import { appDataSource } from "../dataSource";
import { CommentDTO } from "../dtos/comment.dto";
import { Comment } from "../entity/Comment";

class CommentPlanService {
	// Find Plan by Id
	async getComments(id_actividad: number, userId: number | null): Promise<any> {
		const comments = await appDataSource.manager.query(
			`SELECT id_comentario, texto_comentario, created_at, calificacion, bgp_user.username,
		CASE WHEN bgp_user.id = $1 THEN true ELSE false END AS owned
		FROM comment LEFT JOIN bgp_user ON comment.id_usuario=bgp_user.id
		WHERE comment.id_actividad = $2`,
			[userId, id_actividad],
		);

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
