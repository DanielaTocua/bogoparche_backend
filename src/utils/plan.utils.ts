import { NewPlanEntry } from "../dtos/activityTypes.dto";
import * as activityUtils from "../utils/activity.utils";

const toNewPlanEntry = async (object: any): Promise<NewPlanEntry> => {
	const newEntry: NewPlanEntry = {
		titulo_actividad: activityUtils.parseString(object.titulo_actividad),
		ubicacion: activityUtils.parseString(object.ubicacion),
		rango_precio: activityUtils.parsePriceRange(object.rango_precio),
		descripcion: activityUtils.parseString(object.description),
		restriccion_edad: object.restriccion_edad,
		medio_contacto: activityUtils.parseString(object.medio_contacto),
		es_privada: object.es_privada,
		horario_plan: activityUtils.parseString(object.horario_plan),
		es_plan: object.es_plan,
		id_categoria: await activityUtils.parseCategoria(object.categoria),
		es_aprobado: object.es_aprobado,
	};
	return newEntry;
};

export default toNewPlanEntry;
