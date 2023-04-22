import { BaseEntity, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
@Entity("token")
export class Token extends BaseEntity {
	@PrimaryColumn("varchar", { length: 512 })
	token: string;

	@CreateDateColumn()
	createdAt: Date;
}
