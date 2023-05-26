import {
	BaseEntity,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn,
} from "typeorm";

import { Activity } from "./Activity";
import { User } from "./User";
@Entity("favorite")
export class Favorite extends BaseEntity {
	@PrimaryColumn({ name: "id_usuario" })
	id_usuario: number;

	@ManyToOne((type) => User, { onDelete: "CASCADE" })
	@JoinColumn({ name: "id_usuario", referencedColumnName: "id" })
	user: User;

	@PrimaryColumn()
	id_actividad: number;

	@ManyToOne((type) => Activity, { onDelete: "CASCADE" })
	@JoinColumn({ name: "id_actividad", referencedColumnName: "id" })
	activity: Activity;
}
