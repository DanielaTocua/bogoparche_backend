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
import { User } from "./User";
@Entity("comment")
export class Comment extends BaseEntity {
	@PrimaryGeneratedColumn()
	id_comentario: number;

	@Column("integer")
	id_usuario: number;
	@ManyToOne((type) => User, { onDelete: "CASCADE" })
	@JoinColumn({ name: "id_usuario", referencedColumnName: "id" })
	user: User;

	@Column("integer")
	id_actividad: number;
	@ManyToOne((type) => Activity, { onDelete: "CASCADE" })
	@JoinColumn({ name: "id_actividad", referencedColumnName: "id" })
	actividad: Activity;

	@Column("varchar", { length: 200 })
	texto_comentario: string;

	@Column("integer")
	calificacion: number;

	@CreateDateColumn()
	created_at: Date;
}
