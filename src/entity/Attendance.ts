import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	JoinColumn,
	PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "./User";
@Entity("attendance")
export class Favorite extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'id_usuario' })
  	id_usuario: number;

	@ManyToOne(type => User)
	@JoinColumn({name:"id_usuario",referencedColumnName:"id"})
	user: User;

	@Column("integer")
	id_actividad: number;

	@Column("bool")
	es_plan: boolean;
}