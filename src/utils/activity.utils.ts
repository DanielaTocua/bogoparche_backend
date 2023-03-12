import { Hours, NewActivityEntry, Range_prices } from "../dtos/activityTypes.dto";

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

const toNewActivityEntry = (object: any): NewActivityEntry =>{
    const newEntry: NewActivityEntry = {
        titulo_actividad: parseString(object.titulo_actividad),
        ubicacion: parseString(object.ubicacion),
        rango_precio: parsePriceRange(object.rango_precio),
        description: parseString(object.description),
        restriccion_edad: object.restriccion_edad,
        medio_contacto: parseString(object.medio_contacto), 
        es_privada: object.es_privada

    }
    console.log(newEntry)
    return newEntry

}



export default toNewActivityEntry