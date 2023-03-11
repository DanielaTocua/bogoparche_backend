import { QueryResult } from "pg";
import pool from "../database/pool";
import { NewPlanEntry } from "../dtos/activityTypes.dto";

// Find Plan by Id
export const findPlanById = async(id: string): Promise<QueryResult<any>>=> {
    // Connects to the DB
    const client = await pool.connect();
    const result = await client.query(`SELECT * FROM plan WHERE id_actividad = $1`, [id])
    client.release();
    if (result.rowCount === 0){
        throw new Error(`No hay planes con el id ${id}`)
    }
    return result
}

// Adds the id to the json
export const addPlan = async (
    newPlanEntry: NewPlanEntry): Promise<QueryResult<any>> => {
        // Connects to the DB
        const client = await pool.connect();
        // Inserts Plan
        const result = await client.query(
            `INSERT INTO plan (titulo_actividad, ubicacion, rango_precio, descripcion, restriccion_edad, medio_contacto, es_privada, horario_plan) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id_actividad`,
            [newPlanEntry.titulo_actividad, newPlanEntry.ubicacion, newPlanEntry.rango_precio, newPlanEntry.description, newPlanEntry.restriccion_edad, newPlanEntry.medio_contacto, newPlanEntry.es_privada, newPlanEntry.horario_plan],
        );
        client.release();
    return result
}

// Deletes plan
export const deletePlan = async (id: string) : Promise<void> => {
    const client = await pool.connect();
    await client.query('DELETE FROM plan WHERE id_actividad = $1', [id]);
    client.release();
    return
}