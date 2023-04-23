import { BaseEntity, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column} from "typeorm";
import { User } from "./User";
@Entity("favorite")
export class Favorite extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(type => User)
	id_usuario: number;

	@Column("integer")
	id_actividad: number;

	@Column("bool")
	es_plan: boolean;
	


	@CreateDateColumn()
	createdAt: Date;
}
