import { QueryResult } from "pg";

import pool from "../database/pool";
import * as activityUtils from "../utils/activity.utils";

// Find all Activities
export const findAll = async (): Promise<QueryResult<any>> => {
	// Connects to the DB
	const client = await pool.connect();
	// Query all the occurrences
	const result =
		client.query(`SELECT id_actividad, titulo_actividad, ubicacion, rango_precio, descripcion, restriccion_edad, medio_contacto, id_categoria, es_plan FROM plan WHERE es_aprobado IS true AND es_privada IS false
    UNION
    SELECT id_actividad, titulo_actividad, ubicacion, rango_precio, descripcion, restriccion_edad, medio_contacto,id_categoria, es_plan FROM evento WHERE es_aprobado IS true AND es_privada IS false`);
	client.release();
	return result;
};
<<<<<<< HEAD

=======
>>>>>>> 7a99664b067eb018fba5ca9bb0f8c9e0df84186c

export const findCategory = async (nombre_categoria: string) => {
	const client = await pool.connect();
	const result = await client.query(
		`SELECT * FROM categoria WHERE nombre_categoria = $1`,
		[nombre_categoria],
	);
	client.release();
	if (result.rowCount === 0) {
		throw new Error(`No hay categorias con el nombre ${nombre_categoria}`);
	}
	return result;
};

export const filterByPrices = (rangePrices: string[], filtered: any[]) => {
	const filteredByPrice: any[] = [];
	if (rangePrices.length != 0) {
		for (let i = 0; i < rangePrices.length; i++) {
			const filteredPriceI = filtered.filter(
				(activity) => activity.rango_precio == rangePrices[i],
			);
			for (let n = 0; n < filteredPriceI.length; n++) {
				filteredByPrice.push(filteredPriceI[n]);
			}
		}
		filtered = filteredByPrice;
	}
	return filtered;
};

export const filterByCategory = async (
	categories: string[],
	filtered: any[],
) => {
	const filteredByCateg: any[] = [];
	if (categories.length != 0) {
		for (let i = 0; i < categories.length; i++) {
			const id_categoria = await activityUtils.parseCategoria(categories[i]);
			const filteredCategI = filtered.filter(
				(activity) => activity.id_categoria === id_categoria,
			);
			for (let n = 0; n < filteredCategI.length; n++) {
				filteredByCateg.push(filteredCategI[n]);
			}
		}
		filtered = filteredByCateg;
	}
	return filtered;
};

export const searchByWords = (search: string[], filtered: any[]) => {
	if (search.length != 0) {
		for (let i = 0; i < search.length; i++) {
			filtered = filtered.filter(
				(activity) =>
					String(activity.titulo_actividad)
						.toLowerCase()
						.includes(String(search[i]).toLowerCase()) ||
					String(activity.descripcion)
						.toLowerCase()
						.includes(String(search[i]).toLowerCase()) ||
					String(activity.ubicacion)
						.toLowerCase()
						.includes(String(search[i]).toLowerCase()),
			);
		}
	}
	return filtered;
};
