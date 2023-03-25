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
        let filteredByPrice: any[] = []
        let filteredByCateg: any[] = [] 

        // Filter by Price    
        if (rangePrices.length != 0){
            for (let i=0;i<rangePrices.length;i++){
                let filteredPriceI = filtered.filter(activity => activity.rango_precio == rangePrices[i])
                for (let n=0;n<filteredPriceI.length;n++){
                    filteredByPrice.push(filteredPriceI[n])
                }
            }
            filtered = filteredByPrice
        }
        
        // Filter by Categories
        if (categories.length != 0){
            for (let i=0;i<categories.length;i++){
                const id_categoria = await activityUtils.parseCategoria(categories[i])
                let filteredCategI = filtered.filter((activity) => activity.id_categoria === id_categoria)
                for (let n=0;n<filteredCategI.length;n++){
                    filteredByCateg.push(filteredCategI[n])
                }
            }
            filtered = filteredByCateg  
        }
        
        // Search
        if (search.length != 0) {
            for (let i=0;i<search.length;i++){
                filtered = filtered.filter(activity => String(activity.titulo_actividad).toLowerCase().includes(String(search[i]).toLowerCase()) || String(activity.description).toLowerCase().includes(String(search[i]).toLowerCase()))
                console.log(filtered)
            }
        }
        res.send(filtered)
    }
}
export default new ActivityController();
