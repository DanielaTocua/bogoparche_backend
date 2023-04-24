import { Request, Response } from "express";
import commentServices from "../services/comment.service"
import { STATUS_CODES } from "../utils/constants";
import { ServerError } from "../errors/server.error";
import { plainToInstance } from "class-transformer";
import { CommentDTO } from "../dtos/comment.dto";

class CommentController {
    async createComment (req: Request, res: Response): Promise<void> {
        if (!("es_plan" in req.body)) {
			throw new ServerError(
				"es_plan invalid or not defined",
				STATUS_CODES.BAD_REQUEST,
			);
		}
        const newCommentEntry = plainToInstance(CommentDTO, req.body, {
            excludeExtraneousValues: true,
        });
		const esPlan = req.body.es_plan;
    
		if (esPlan) {
            try {
                const result = await commentServices.addCommentPlan(newCommentEntry);
                res.json({result});
            } catch (error) {
                res.json({ error: error }).status(STATUS_CODES.BAD_REQUEST);
            }
            
        }else {
            try {
                const result = await commentServices.addCommentEvent(newCommentEntry);
                res.json({result});
            } catch (error) {
                res.json({ error: error }).status(STATUS_CODES.BAD_REQUEST);
            }
            
        }
    }

    async getCommentsFromTable(req: Request, res: Response): Promise<void> {
        const esPlan = JSON.parse(req.params.es_plan);
        const idActividad = parseInt(req.params.id)
        if (esPlan) {
            try {
                const result = await commentServices.getCommentsPlan(idActividad)
                res.json(result)    
            } catch (error) {
                res.json({ error: error }).status(STATUS_CODES.NOT_FOUND);
            }

        }else {
            try {
                const result = await commentServices.getCommentsEvent(idActividad)
                res.json(result)    
            } catch (error) {
                res.json({ error: error }).status(STATUS_CODES.NOT_FOUND);
            }

        }
        
    }
}

export default new CommentController();