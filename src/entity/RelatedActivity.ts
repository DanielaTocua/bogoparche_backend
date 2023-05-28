import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";

import { Activity } from "./Activity";

@Entity("relatedactivity")
export class RelatedActivity extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: "id_actividad_privada" })
	id_actividad_privada: number;

	@Column({ name: "id_actividad_publica" })
	id_actividad_publica: number;

	@ManyToOne((type) => Activity, { onDelete: "CASCADE" })
	@JoinColumn({ name: "id_actividad_privada", referencedColumnName: "id" })
	activity_private: Activity;

	@ManyToOne((type) => Activity, { onDelete: "CASCADE" })
	@JoinColumn({ name: "id_actividad_publica", referencedColumnName: "id" })
	activity_public: Activity;
}
