import { QueryResult } from "pg";

import pool from "../database/pool";

// Find all Activities
export const findAll = async (): Promise<QueryResult<any>> => {
	// Connects to the DB
	const client = await pool.connect();
	// Query all the occurrences
	const result =
		client.query(`SELECT id_actividad, titulo_actividad, ubicacion, rango_precio, descripcion, restriccion_edad, medio_contacto FROM plan WHERE es_privada IS false
    UNION
    SELECT id_actividad, titulo_actividad, ubicacion, rango_precio, descripcion, restriccion_edad, medio_contacto FROM evento WHERE es_privada IS false`);
	client.release();
	return result;
};
