import { Hours, NewActivityEntry, Range_prices } from "../dtos/activityTypes.dto";
import * as activityServices from '../services/activity.service'

export const parseString = (string: any): string => {
    if (typeof string != 'string'){
        throw new Error('Entrada incorrecta o faltante')
    }
    return string
}

const isString = (string: string): boolean => {
    return typeof string === 'string'
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date))
}

const isPriceRange = (price_range: any): boolean => {
    return Object.values(Range_prices).includes(price_range)
}

const isHours = (hours: any): boolean => {
    return Object.values(Hours).includes(hours)
}

export const parseDate = (dateFromRequest: any): Date => {
    if (!isString(dateFromRequest) || !(isDate(dateFromRequest))){
        throw new Error('Fecha incorrecta o faltante')
    }
    return dateFromRequest
}


export const parsePriceRange = (priceRangeFromRequest: any): Range_prices => {
    if (!isString(priceRangeFromRequest) || !(isPriceRange(priceRangeFromRequest))){
        console.log(typeof priceRangeFromRequest, (isPriceRange(priceRangeFromRequest)))
        throw new Error(`Rango de precio no válido`)
    }
    return priceRangeFromRequest
}

export const parseHours = (hoursFromRequest: any): Hours => {
    if (!isString(hoursFromRequest) || !(isHours(hoursFromRequest))){
        console.log(typeof hoursFromRequest, hoursFromRequest)
        console.log(isString(hoursFromRequest))
        throw new Error('Rango horario no válido')
    }
    return hoursFromRequest
}

export const parseCategoria = async (nombre_categoria:any): Promise<number> => {
    const result = await activityServices.findCategory(nombre_categoria)
    const rows = result.rows
    return (rows[0].id_categoria)
}

export const categoriaAsNumber = async (promise: Promise<number>): Promise<number> => {
    return await promise
}

const toNewActivityEntry = async (object: any): Promise<NewActivityEntry> =>{
    const newEntry: NewActivityEntry = {
        titulo_actividad: parseString(object.titulo_actividad),
        ubicacion: parseString(object.ubicacion),
        rango_precio: parsePriceRange(object.rango_precio),
        description: parseString(object.description),
        restriccion_edad: object.restriccion_edad,
        medio_contacto: parseString(object.medio_contacto), 
        es_privada: object.es_privada,
        es_plan: object.es_plan,
        id_categoria: await parseCategoria(object.categoria)
    }
    console.log(newEntry)
    return newEntry

}



export default toNewActivityEntry