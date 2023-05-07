import bcrypt from "bcrypt";
import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity("bgp_user")
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Index()
	@Column("varchar", { length: 200, unique: true })
	username: string;

	@Index()
	@Column("varchar", { length: 200, unique: true })
	email: string;

	@Column("varchar", { length: 200 })
	password: string;

	@Column("bool", { default: false })
	isAdmin: boolean;

	async validatePassword(password: string) {
		const compare = await bcrypt.compare(password, this.password);
		return compare;
	}
}
