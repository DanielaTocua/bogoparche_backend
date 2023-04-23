import { NewActivityEntry } from "../dtos/activityTypes.dto";
import * as activityServices from "../services/activity.service";
import { RANGE_PRICES } from "./constants";

export const parseString = (string: any): string => {
	if (typeof string != "string") {
        console.log(string)
		throw new Error("Entrada incorrecta o faltante");
	}
	return string;
};

export const isString = (string: string): boolean => {
	return typeof string === "string";
};

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

const isPriceRange = (price_range: any): boolean => {
	return Object.values(RANGE_PRICES).includes(price_range);
};

export const parsePriceRange = (priceRangeFromRequest: any): RANGE_PRICES => {
	if (
		!isString(priceRangeFromRequest) ||
		!isPriceRange(priceRangeFromRequest)
	) {
		console.log(
			typeof priceRangeFromRequest,
			isPriceRange(priceRangeFromRequest),
		);
		throw new Error(`Rango de precio no válido`);
	}
	return priceRangeFromRequest;
};

    if (!isString(priceRangeFromRequest) || !(isPriceRange(priceRangeFromRequest))){
        console.log(typeof priceRangeFromRequest, (isPriceRange(priceRangeFromRequest)))
        throw new Error(`Rango de precio no válido`)
    }
    return priceRangeFromRequest
}


const toNewActivityEntry = async (object: any): Promise<NewActivityEntry> => {
	const newEntry: NewActivityEntry = {
		titulo_actividad: parseString(object.titulo_actividad),
		ubicacion: parseString(object.ubicacion),
		rango_precio: parsePriceRange(object.rango_precio),
		descripcion: parseString(object.description),
		restriccion_edad: object.restriccion_edad,
		medio_contacto: parseString(object.medio_contacto),
		es_privada: object.es_privada,
		es_plan: object.es_plan,
		id_categoria: await parseCategoria(object.categoria),
		es_aprobado: object.es_aprobado,
	};
	return newEntry;
};

export default toNewActivityEntry;
