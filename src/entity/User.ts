import bcrypt from "bcrypt";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

<<<<<<< HEAD
@Entity("bgp_user")
=======
@Entity("user")
>>>>>>> 7a99664b067eb018fba5ca9bb0f8c9e0df84186c
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column("varchar", { length: 200, unique: true })
	username: string;

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
