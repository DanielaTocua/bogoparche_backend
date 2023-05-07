import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { Activity } from "./Activity";

@Entity("plan")
export class Plan {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToOne(type => Activity)
	@JoinColumn({name:"id_actividad",referencedColumnName:"id"})
  	activity: Activity;

	@Column("varchar", { length: 100 })
	horario_plan: string;
}