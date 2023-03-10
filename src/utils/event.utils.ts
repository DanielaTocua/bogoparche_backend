import { NewEventEntry, Range_prices, Hours } from "../dtos/activityTypes.dto";
import * as activityUtils from '../utils/activity.utils'


const toNewEventEntry = (object: any): NewEventEntry =>{
    if (typeof object.fecha_fin === undefined){
        object.fecha_fin = object.fecha_inicio
    }
    if (typeof object.hora_fin === undefined){
        object.hora_fin = object.hora_inicio
    }
    const newEntry: NewEventEntry = {
        titulo_actividad: activityUtils.parseString(object.titulo_actividad),
        ubicacion: activityUtils.parseString(object.ubicacion),
        rango_precio: activityUtils.parsePriceRange(object.rango_precio),
        description: activityUtils.parseString(object.description),
        restriccion_edad: object.restriccion_edad,
        medio_contacto: activityUtils.parseString(object.medio_contacto), 
        es_privada: object.es_privada,
        fecha_inicio: activityUtils.parseDate(object.fecha_inicio),
        fecha_fin: activityUtils.parseDate(object.fecha_fin),
        hora_inicio:  activityUtils.parseHours(object.hora_inicio),
        hora_fin: activityUtils.parseHours(object.hora_fin)

    }
    console.log(newEntry)
    return newEntry

}


export default toNewEventEntry