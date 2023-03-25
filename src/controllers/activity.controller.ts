import { NextFunction, Request, Response } from "express";
import * as eventServices from '../services/event.service'
import { STATUS_CODES } from "../utils/constants";
import toNewEventEntry from '../utils/event.utils'
import * as activityServices from '../services/activity.service'
import * as activityUtils from '../utils/activity.utils'

class ActivityController {
	async getAll(req: Request,res: Response): Promise<void> {
        const result = activityServices.findAll()
        res.send((await result).rows)
    }

    async filter(req: Request, res: Response): Promise<void> {
        let filtered = (await activityServices.findAll()).rows

        const search: string[] = req.query.search ? (req.query.search as string).split(' ') : []
        const rangePrices: string[] = req.query.range_prices ? (req.query.range_prices as string).split(',') : [];
        const categories: string[] = req.query.categories ? (req.query.categories as string).split(',') : [];
        
        let filteredByCateg: any[] = [] 

        // Filter by Price    
        filtered = activityServices.filterByPrices(rangePrices,filtered)
        
        // Filter by Categories
        filtered = await activityServices.filterByCategory(categories,filtered)
        
        // Search
        filtered = activityServices.searchByWords(search,filtered)
        res.send(filtered)
    }
}
export default new ActivityController();
