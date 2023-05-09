import { Request, Response } from "express";

import favoriteFacade from "../facades/favorite.facade";
import { STATUS_CODES } from "../utils/constants";

class FavoriteController {
	async addFavorites(req: Request, res: Response): Promise<void> {
		// Retrieves plan info
		const result = await favoriteFacade.addFavorites(
			req.userId as number,
			req.body.id_actividad,
		);
		res.send(result).status(STATUS_CODES.OK);
	}

	async getFavoriteByActivityId(req: Request, res: Response): Promise<void> {
		const favorite = await favoriteFacade.getFavoriteByActivityId(
			req.userId as number,
			parseInt(req.params.id),
		);
		res.json(favorite);
	}

	async deleteFavorites(req: Request, res: Response): Promise<void> {
		await favoriteFacade.deleteFavorites(
			req.userId as number,
			parseInt(req.params.id),
		);
		res.json({ msg: "Favorite succesfully deleted" });
	}
}
export default new FavoriteController();
