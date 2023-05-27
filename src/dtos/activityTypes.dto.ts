import { RANGE_PRICES } from "../utils/constants";

// Tipos de Activities
export interface ActivityEntry {
	id_actividad: number;
	titulo_actividad: string;
	ubicacion: string;
	image: String;
	rango_precio: RANGE_PRICES;
	descripcion: string;
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
