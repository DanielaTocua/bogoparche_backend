import { CreateDateColumn, createQueryBuilder, getRepository } from "typeorm";
import { CommentDTO } from "../dtos/comment.dto";
import { Comment } from "../entity/Comment";
import { User } from "../entity/User";
import { CalificacionAdded1683524660561 } from "@/migration/1683524660561-calificacionAdded";

class CommentPlanService {
	// Find Plan by Id
	async getComments(id_actividad: number): Promise<any> {
		const comments = await Comment.find({
			where: { id_actividad: id_actividad },
			relations: ['user'], // Nombre de la relación definida en la entidad "Comment"
		  });	
		  let commentsToReturn = []
		  for (let i = 0; i < comments.length; i++){
			commentsToReturn.push ({
				id_comentario: comments[i].id_comentario,
				id_actividad: comments[i].id_actividad,
				texto_comentario: comments[i].texto_comentario,
				createdAt: comments[i].createdAt,
				calificacion: comments[i].calificacion,
				username: comments[i].user.username
			})
		  }
		
		return commentsToReturn;
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
