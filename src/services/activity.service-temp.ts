import { Category } from "@/entity/Category";
import { appDataSource } from "../dataSource";
import { Activity } from "../entity/Activity";
import { ServerError } from "../errors/server.error";
import { STATUS_CODES } from "../utils/constants";
class ActivityService {
	async findAllPublic(): Promise<Activity[]> {
        // Puede cambiarse a raw queries
        const publicActivities = (await appDataSource.manager.query(`SELECT id, titulo_actividad, ubicacion, rango_precio, descripcion, restriccion_edad, medio_contacto, id_categoria, true AS es_plan FROM plan WHERE es_aprobado IS true AND es_privada IS false
        UNION
        SELECT id, titulo_actividad, ubicacion, rango_precio, descripcion, restriccion_edad, medio_contacto,id_categoria, false AS es_plan FROM evento WHERE es_aprobado IS true AND es_privada IS false`)) as Activity[]
        return publicActivities
    }
    async findCategory(nombre_categoria:string){
        if (typeof nombre_categoria != 'string' || nombre_categoria == "" ){
            throw new ServerError("Invalid category name", STATUS_CODES.BAD_REQUEST);
        }
        const categoria = Category.findOneBy({nombre_categoria})
        return categoria
        
        
    }

    

}
export default new ActivityService();