import { NewPlanEntry, Range_prices } from "../dtos/activityTypes.dto";
import * as activityUtils from '../utils/activity.utils'


const toNewPlanEntry = (object: any): NewPlanEntry =>{
    const newEntry: NewPlanEntry = {
        titulo_actividad: activityUtils.parseString(object.titulo_actividad),
        ubicacion: activityUtils.parseString(object.ubicacion),
        rango_precio: activityUtils.parsePriceRange(object.rango_precio),
        description: activityUtils.parseString(object.description),
        restriccion_edad: object.restriccion_edad,
        medio_contacto: activityUtils.parseString(object.medio_contacto), 
        es_privada: object.es_privada,
        horario_plan: activityUtils.parseString(object.horario_plan)       

    }
    console.log(newEntry)
    return newEntry

}



export default toNewPlanEntry