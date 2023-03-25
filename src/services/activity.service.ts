import { QueryResult } from 'pg'
import pool from '../database/pool'


// Find all Activities
export const findAll = async (): Promise<QueryResult<any>> => {
    // Connects to the DB
    const client = await pool.connect();
    // Query all the occurrences
    const result = client.query(`SELECT id_actividad, titulo_actividad, ubicacion, rango_precio, descripcion, restriccion_edad, medio_contacto, id_categoria FROM plan WHERE es_privada IS false
    UNION
    SELECT id_actividad, titulo_actividad, ubicacion, rango_precio, descripcion, restriccion_edad, medio_contacto,id_categoria FROM evento WHERE es_privada IS false`);
    client.release();
    return result
}

export const findCategory = async (nombre_categoria:string) => {
    const client = await pool.connect();
    const result = await client.query(`SELECT * FROM categoria WHERE nombre_categoria = $1`, [nombre_categoria])
    client.release();
    if (result.rowCount === 0){
        throw new Error(`No hay categorias con el nombre ${nombre_categoria}`)
    }
    return result
    
}
