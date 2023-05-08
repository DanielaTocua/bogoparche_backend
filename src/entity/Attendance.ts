import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";

import { Activity } from "./Activity";
import { User } from "./User";
@Entity("attendance")
export class Attendance extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: "id_usuario" })
	id_usuario: number;

	@ManyToOne((type) => User)
	@JoinColumn({ name: "id_usuario", referencedColumnName: "id" })
	user: User;

	@Column("integer")
	id_actividad: number;
	@ManyToOne((type) => Activity, { onDelete: "CASCADE" })
	@JoinColumn({ name: "id_actividad", referencedColumnName: "id" })
	activity: Activity;

}
