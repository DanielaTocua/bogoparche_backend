import { NextFunction, Request, Response } from "express";

export default (fn: (...args: any[]) => any) => {
	return (req: Request, res: Response, next: NextFunction) => {
		return Promise.resolve(fn(req, res, next)).catch(next);
	};
};
