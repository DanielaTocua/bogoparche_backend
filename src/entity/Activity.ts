import {
	BaseEntity,
	Column,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";

import { RANGE_PRICES } from "../utils/constants";
import { Category } from "./Category";

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
	descripcion: string;

	@Column("bool", { default: false })
	restriccion_edad: boolean;

	@Column("varchar", { length: 200 })
	medio_contacto: string;

	@Column("bool", { default: false })
	es_privada: boolean;

	@ManyToOne((type) => Category)
	@JoinColumn({ name: "id_categoria", referencedColumnName: "id" })
	id_categoria: number;

	@Column("bool", { default: false })
	es_aprobado: boolean;

	es_plan: boolean;
}
