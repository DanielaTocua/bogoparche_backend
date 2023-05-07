import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";

import { Activity } from "./Activity";
import { Plan } from "./Plan";
import { User } from "./User";
@Entity("commentPlan")
export class CommentPlan extends BaseEntity {
	@PrimaryGeneratedColumn()
	id_comentario: number;

	@Column({ name: "id_usuario" })
	id_usuario: number;

	@ManyToOne((type) => User)
	@JoinColumn({ name: "id_usuario", referencedColumnName: "id" })
	user: User;

	@Column({ name: "id_actividad" })
	id_actividad: number;

	@ManyToOne((type) => Plan)
	@JoinColumn({ name: "id_actividad", referencedColumnName: "id" })
	activity: Activity;

	@Column("varchar", { length: 200 })
	texto_comentario: string;

	@CreateDateColumn()
	createdAt: Date;
}
