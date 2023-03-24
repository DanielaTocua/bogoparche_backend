import { Request, Response } from "express";

import * as activityServices from "../services/activity.service";

class ActivityController {
	async getAll(req: Request, res: Response): Promise<void> {
		const result = activityServices.findAll();
		res.send((await result).rows);
	}
}

export default new ActivityController();
