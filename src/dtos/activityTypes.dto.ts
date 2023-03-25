// Se guardan todos los tipos 
export enum Hours {
    '00:00' = '00:00',
    '00:30' = '00:30',
    '01:00' = '01:00',
    '01:30' = '01:30',
    '02:00' = '02:00',
    '02:30' = '02:30',
    '03:00' = '03:00',
    '03:30' = '03:30',
    '04:00' = '04:00',
    '04:30' = '04:30',
    '05:00' = '05:00',
    '05:30' = '05:30',
    '06:00' = '06:00',
    '06:30' = '06:30',
    '07:00' = '07:00',
    '07:30' = '07:30',
    '08:00' = '08:00',
    '08:30' = '08:30',
    '09:00' = '09:00',
    '09:30' = '09:30',
    '10:00' = '10:00',
    '10:30' = '10:30',
    '11:00' = '11:00',
    '11:30' = '11:30',
    '12:00' = '12:00',
    '12:30' = '12:30',
    '13:00' = '13:00',
    '13:30' = '13:30',
    '14:00' = '14:00',
    '14:30' = '14:30',
    '15:00' = '15:00',
    '15:30' = '15:30',
    '16:00' = '16:00',
    '16:30' = '16:30',
    '17:00' = '17:00',
    '17:30' = '17:30',
    '18:00' = '18:00',
    '18:30' = '18:30',
    '19:00' = '19:00',
    '19:30' = '19:30',
    '20:00' = '20:00',
    '20:30' = '20:30',
    '21:00' = '21:00',
    '21:30' = '21:30',
    '22:00' = '22:00',
    '22:30' = '22:30',
    '23:00' = '23:00',
    '23:30' = '23:30',
    '24:00' = '24:00',
  }

export enum Range_prices {
    Gratis = "Gratis",
    Range_1_10 = '1k - 10k',
    Range_10_50 = '10k - 50k',
    Range_50_100 = '50k - 100k',
    Range_100_150 = '100k - 150k',
    Range_more_150 = '+ 150k'
}


// Tipos de Activities
export interface ActivityEntry {
    id_actividad: number,
    titulo_actividad: string,
    ubicacion: string,
    rango_precio: Range_prices,
    description: string,
    restriccion_edad: boolean,
    medio_contacto: string,
    es_privada: boolean,
    es_plan: boolean,
    id_categoria: number
}
// With Pick
// export type NonSensitiveInfoActivityEntry = Pick<ActivityEntry, 'titulo_actividad' | 'description' | 'medio_contacto' | 'rango_precio' | 'ubicacion' | 'restriccion_edad'>

// With Omit
export type NonSensitiveInfoActivityEntry = Omit<ActivityEntry,'es_privada'>
export type NewActivityEntry = Omit <ActivityEntry, 'id_actividad'>

// Tipos de Events
export interface EventEntry extends ActivityEntry {
    fecha_inicio: Date,
    fecha_fin: Date,
    hora_inicio: Hours,
    hora_fin: Hours
}
export type NewEventEntry = Omit <EventEntry, 'id_actividad'>

// // Tipos de Plans
export interface PlanEntry extends ActivityEntry {
    horario_plan: string
}
export type NewPlanEntry = Omit <PlanEntry, 'id_actividad'>