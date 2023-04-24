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
@Entity("favorite")
export class Favorite extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(type => User)
	@JoinColumn({name:"id_usuario",referencedColumnName:"id"})
	id_usuario: number;

	@Column("integer")
	id_actividad: number;

	@Column("bool")
	es_plan: boolean;

	@CreateDateColumn()
	createdAt: Date;
}
