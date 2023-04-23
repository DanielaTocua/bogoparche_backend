import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

import { RANGE_PRICES } from "../utils/constants";

export class Activity extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column("varchar", { length: 200 })
	titulo_actividad: string;

	@Column("varchar", { length: 200 })
	ubicacion: string;

	@Column("varchar", { length: 30 })
	rango_precio: RANGE_PRICES;

	@Column("varchar", { length: 200 })
	description: string;

	@Column("bool", { default: false })
	restriccion_edad: boolean;

	@Column("bool", { default: false })
	medio_contacto: boolean;

	@Column("bool", { default: false })
	es_privada: boolean;

	@Column("integer")
	id_categoria: number;

	@Column("bool", { default: false })
	es_aprobado: boolean;

	es_plan: boolean
}
