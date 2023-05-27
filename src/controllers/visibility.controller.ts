import { Request, Response } from "express";

import visibilityFacade from "../facades/visibility.facade";
import { STATUS_CODES } from "../utils/constants";

class VisibilityController {
	async addVisibilityGroup(req: Request, res: Response): Promise<void> {
		// Retrieves plan info

		await visibilityFacade.addVisibilityGroup(
			req.body.users,
			parseInt(req.params.id),
		);
		res.send({ msg: "Group added succesfully" }).status(STATUS_CODES.OK);
	}

	async deleteVisibility(req: Request, res: Response): Promise<void> {
		await visibilityFacade.deleteVisibility(
			req.body.id_usuario as number,
			parseInt(req.params.id),
		);
		res.json({ msg: "Visibility succesfully deleted" });
	}
}
export default new VisibilityController();
