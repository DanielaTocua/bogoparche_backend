import { createQueryBuilder, getRepository } from "typeorm";
import { CommentDTO } from "../dtos/comment.dto";
import { Comment } from "../entity/Comment";
import { User } from "../entity/User";

class CommentPlanService {
	// Find Plan by Id
	async getComments(id_actividad: number): Promise<any> {
		const comments = await Comment.find({
			where: { id_actividad: id_actividad },
			relations: ['user'], // Nombre de la relación definida en la entidad "Comment"
		  });	
		
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
