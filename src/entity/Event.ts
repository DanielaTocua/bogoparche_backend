import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryColumn,
} from "typeorm";

import { Activity } from "./Activity";

@Entity("event")
export class Event extends BaseEntity {
	@PrimaryColumn()
	id: number;

	@OneToOne((type) => Activity)
	@JoinColumn({ name: "id", referencedColumnName: "id" })
	activity: Activity;

	@Column("date")
	fecha_inicio: Date;

	@Column("date")
	fecha_fin: Date;

	@Column("time")
	hora_inicio: Date;

	@Column("time")
	hora_fin: Date;
}
