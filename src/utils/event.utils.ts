import { NewEventEntry } from "../dtos/activityTypes.dto";
import * as activityUtils from "../utils/activity.utils";

const toNewEventEntry = async (object: any): Promise<NewEventEntry> =>{
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
        fecha_inicio: object.fecha_inicio,
        fecha_fin: object.fecha_fin,
        hora_inicio:  object.hora_inicio,
        hora_fin: object.hora_fin,
        es_plan: object.es_plan,
        id_categoria: await activityUtils.parseCategoria(object.categoria),
        es_aprobado: object.es_aprobado
    }
    return newEntry

}


export default toNewEventEntry;

