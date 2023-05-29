import { appDataSource } from "../dataSource";
import { CommentDTO } from "../dtos/comment.dto";
import { Comment } from "../entity/Comment";
import { ServerError } from "../errors/server.error";
import { STATUS_CODES } from "../utils/constants";

class CommentPlanService {
	// Find Plan by Id
	async getComments(id_actividad: number, userId: number | null): Promise<Comment[]> {
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

	async deleteComment(comentario: Comment): Promise<void> {
		Comment.remove(comentario);
	}

	async findCommentById(id: number): Promise<Comment> {
		try {
			const comment = await Comment.findOneOrFail({
				where: { id_comentario: id },
			});
			return comment;
		} catch {
			throw new ServerError(
				`The comment id: ${id} does not exist`,
				STATUS_CODES.BAD_REQUEST,
			);
		}
	}
}
export default new CommentPlanService();
