import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
} from "typeorm";

import { RANGE_PRICES } from "../utils/constants";
import { Category } from "./Category";
import { Event } from "./Event";
import { Plan } from "./Plan";
import { User } from "./User";

@Entity("activity")
export class Activity extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column("varchar", { length: 200 })
	titulo_actividad: string;

	@Column("varchar", {length: 200})
	image: string;

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

	@Column({ name: "id_categoria" })
	id_categoria: number;

	@Column({ name: "id_usuario" })
	id_usuario: number;

	@ManyToOne((type) => User)
	@JoinColumn({ name: "id_usuario", referencedColumnName: "id" })
	user: User;

	@ManyToOne((type) => Category)
	@JoinColumn({ name: "id_categoria", referencedColumnName: "id" })
	categoria: Category;

	@Column("bool", { default: false })
	es_aprobado: boolean;

	@Column("bool", { default: false })
	es_plan: boolean;

	@OneToOne(() => Event, { cascade: true })
	event: Event;

	@OneToOne(() => Plan, { cascade: true })
	plan: Plan;
}
