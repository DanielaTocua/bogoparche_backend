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
		const result = await commentFacade.getComments(id_actividad);
		res.json(result);
	}
}

export default new CommentController();
