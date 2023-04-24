import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	JoinColumn,
	PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "./User";
import { Plan } from "./Plan";
@Entity("commentPlan")
export class CommentPlan extends BaseEntity {
	@PrimaryGeneratedColumn()
	id_comentario: number;

	@ManyToOne(type => User)
	@JoinColumn({name:"id_usuario",referencedColumnName:"id"})
	id_usuario: number;

	@ManyToOne(type => Plan)
	@JoinColumn({name:"id_actividad",referencedColumnName:"id" })
	id_actividad: number;

	@Column("varchar", { length: 200 })
	texto_comentario: string;

	@CreateDateColumn()
	createdAt: Date;
}

