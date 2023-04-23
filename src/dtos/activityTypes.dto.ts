<<<<<<< HEAD
import { RANGE_PRICES } from "../utils/constants";
=======
export enum Range_prices {
	Gratis = "Gratis",
	Range_1_10 = "1k - 10k",
	Range_10_50 = "10k - 50k",
	Range_50_100 = "50k - 100k",
	Range_100_150 = "100k - 150k",
	Range_more_150 = "+ 150k",
}
>>>>>>> 7a99664b067eb018fba5ca9bb0f8c9e0df84186c

// Tipos de Activities
export interface ActivityEntry {
	id_actividad: number;
	titulo_actividad: string;
	ubicacion: string;
<<<<<<< HEAD
	rango_precio: RANGE_PRICES;
	descripcion: string;
=======
	rango_precio: Range_prices;
	description: string;
>>>>>>> 7a99664b067eb018fba5ca9bb0f8c9e0df84186c
	restriccion_edad: boolean;
	medio_contacto: string;
	es_privada: boolean;
	es_plan: boolean;
	id_categoria: number;
	es_aprobado: boolean;
}
// With Pick
// export type NonSensitiveInfoActivityEntry = Pick<ActivityEntry, 'titulo_actividad' | 'description' | 'medio_contacto' | 'rango_precio' | 'ubicacion' | 'restriccion_edad'>

// With Omit
export type NonSensitiveInfoActivityEntry = Omit<ActivityEntry, "es_privada">;
export type NewActivityEntry = Omit<ActivityEntry, "id_actividad">;

// Tipos de Events
export interface EventEntry extends ActivityEntry {
	fecha_inicio: Date;
	fecha_fin: Date;
	hora_inicio: Date;
	hora_fin: Date;
}
export type NewEventEntry = Omit<EventEntry, "id_actividad">;

// // Tipos de Plans
export interface PlanEntry extends ActivityEntry {
	horario_plan: string;
}
export type NewPlanEntry = Omit<PlanEntry, "id_actividad">;
