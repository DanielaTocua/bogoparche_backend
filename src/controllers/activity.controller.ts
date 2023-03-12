import { NextFunction, Request, Response } from "express";
import * as eventServices from '../services/event.service'
import { STATUS_CODES } from "../utils/constants";
import toNewEventEntry from '../utils/event.utils'
import * as activityServices from '../services/activity.service'

class ActivityController {
	async getAll(req: Request,res: Response): Promise<void> {
        const result = activityServices.findAll()
        res.send((await result).rows)
    }
}

export default new ActivityController();
