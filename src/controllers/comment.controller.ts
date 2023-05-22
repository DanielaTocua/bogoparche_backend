import { Request, Response } from "express";

import commentFacade from "../facades/comment.facade";

class CommentController {
	async createComment(req: Request, res: Response): Promise<void> {
		const result = await commentFacade.addComment(
			req.userId as number,
			req.body,
		);
		res.json({ result });
	}

	async getCommentsFromTable(req: Request, res: Response): Promise<void> {
		const id_actividad = parseInt(req.params.id);
		const userId = req.userId ? req.userId : null;
		const result = await commentFacade.getComments(id_actividad, userId);
		res.json(result);
	}

	async deleteComment(req: Request, res: Response): Promise<void> {
		const id_comentario = parseInt(req.params.id);
		await commentFacade.deleteComment(
			id_comentario,
			req.userId as number,
		);
		res.json({ msg: "Comment succesfully deleted" });
	}
}

export default new CommentController();
