import { Request, Response } from "express";

import activityFacade from "../facades/activity.facade";
import activityService from "../services/activity.service";
import { STATUS_CODES } from "../utils/constants";

class ActivityController {
    async getUserPrivate(req: Request, res: Response):Promise<void>{
        const userId = req.userId ? req.userId : 0
        console.log(req.userId)
        const result = await activityService.findUserPrivate(userId);
		res.send(result);
    }

	async getAll(req: Request, res: Response): Promise<void> {
		const result = await activityService.findAllPublic();
		res.send(result);
	}

	async getAllNotApproved(req: Request, res: Response): Promise<void> {
		const result = await activityService.findAllNotApproved();
		res.send(result);
	}

    async editApproved(req: Request, res: Response): Promise<void>{
        await activityFacade.editApproved(parseInt(req.params.id))
        res.json({ msg: "Approve succesfully" })
    }

	async deleteActivity(req: Request, res: Response): Promise<void> {
		const result = await activityFacade.deleteActivity(parseInt(req.params.id));
		res.json(result).status(STATUS_CODES.OK);
	}

	async getActivity(req: Request, res: Response): Promise<void> {
		const result = await activityFacade.getActivity(parseInt(req.params.id));
		res.json(result);
	}

	async filterPublic(req: Request, res: Response): Promise<void> {
        
        const search: string[] = req.query.search
            ? (req.query.search as string).split(" ")
            : [];
        const rangePrices: string[] = req.query.range_prices
            ? (req.query.range_prices as string).split(",")
            : [];
        const categories: string[] = req.query.categories
            ? (req.query.categories as string).split(",")
            : [];
        const result = await activityFacade.publicFilter(search,rangePrices,categories);
+

        res.send(result);
    }

	async filterPrivate(req: Request, res: Response): Promise<void> {
		const favorite: boolean = ((req.query.favorite+'').toLowerCase() === 'true') ? true : false
		const attendance: boolean = ((req.query.attendance+'').toLowerCase() === 'true') ? true : false
        const search: string[] = req.query.search
            ? (req.query.search as string).split(" ")
            : [];
        const rangePrices: string[] = req.query.range_prices
            ? (req.query.range_prices as string).split(",")
            : [];
        const categories: string[] = req.query.categories
            ? (req.query.categories as string).split(",")
            : [];
        const result = await activityFacade.privateFilter(req.userId as number,favorite ,attendance, search,rangePrices,categories);
		res.send(result);
	}
}
export default new ActivityController();
