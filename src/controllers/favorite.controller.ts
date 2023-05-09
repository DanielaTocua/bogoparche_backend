import { Request, Response } from "express";

import favoriteService from "../services/favorite.service";
import { STATUS_CODES } from "../utils/constants";

class FavoriteController {
	async addFavorites(req: Request, res: Response): Promise<void> {
		// Retrieves plan info
		await favoriteService.addFavorites(
			req.userId as number,
			req.body.id_actividad,
		);
		res.json({ msg: "Favorite succesfully added" }).status(STATUS_CODES.OK);
	}

	async getFavoriteByActivityId(req: Request, res: Response): Promise<void> {
		const favorite = await favoriteService.getFavoriteByActivityId(
			req.userId as number,
			parseInt(req.params.id),
		);
		res.json(favorite);
	}

	async deleteFavorites(req: Request, res: Response): Promise<void> {
		await favoriteService.deleteFavorites(
			req.userId as number,
			parseInt(req.params.id),
		);
		res.json({ msg: "Favorite succesfully deleted" });
	}
}
export default new FavoriteController();
