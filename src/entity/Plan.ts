import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

import { Activity } from "./Activity";

@Entity("plan")
export class Plan extends BaseEntity{
	@PrimaryColumn()
	id: number;

	@OneToOne(type => Activity)
	@JoinColumn({name:"id",referencedColumnName:"id"})
  	activity: Activity;

	@Column("varchar", { length: 100 })
	horario_plan: string;
}