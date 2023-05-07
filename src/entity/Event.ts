import { Column, Entity, PrimaryGeneratedColumn,OneToOne, JoinColumn } from "typeorm";

import { Activity } from "./Activity";

@Entity("event")
export class Event  {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToOne(type => Activity)
	@JoinColumn({name:"id_actividad",referencedColumnName:"id"})
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