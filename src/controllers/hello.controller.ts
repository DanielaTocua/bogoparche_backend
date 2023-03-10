import { NextFunction, Request, Response } from "express";

import helloFacade from "../facades/hello.facade";
import { STATUS_CODES } from "../utils/constants";

class HelloController {
	async hello(req: Request, res: Response, next: NextFunction): Promise<void> {
		res.json(await helloFacade.hello()).status(STATUS_CODES.OK);
	}
}

export default new HelloController();
