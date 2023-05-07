import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";

import { Event } from "./Event";
import { User } from "./User";
@Entity("commentEvent")
export class CommentEvent extends BaseEntity {
	@PrimaryGeneratedColumn()
	id_comentario: number;

	@ManyToOne((type) => User)
	@JoinColumn({ name: "id_usuario", referencedColumnName: "id" })
	id_usuario: number;

	@ManyToOne((type) => Event)
	@JoinColumn({ name: "id_actividad", referencedColumnName: "id" })
	id_actividad: number;

	@Column("varchar", { length: 200 })
	texto_comentario: string;

	@CreateDateColumn()
	createdAt: Date;
}
