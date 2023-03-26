import { Request, Response } from "express";

import categoryFacade from "../facades/category.facade";
import { STATUS_CODES } from "../utils/constants";

class CategoryController {
	async getAll(req: Request, res: Response): Promise<void> {
		res.json(await categoryFacade.getAll()).status(STATUS_CODES.OK);
	}
}

export default new CategoryController();
