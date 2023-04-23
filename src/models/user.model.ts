import bcrypt from "bcrypt";

import pool from "../database/pool";

class UserModel {
	id: number;
	username: string;
	email: string;
	password: string;

	constructor(id: number, username: string, email: string, password: string) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
	}

	static async createUser(username: string, email: string, password: string) {
		const salt = bcrypt.genSaltSync(10);
		const hashedPassword = bcrypt.hashSync(password, salt);
		const newUserResult = await pool.query(
			"INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING id,name,email,password",
			[username, email, hashedPassword],
		);
		const newUser = newUserResult.rows[0];
		return new UserModel(
			newUser.id,
			newUser.name,
			newUser.email,
			newUser.password,
		);
	}

	static async findByEmail(email: string): Promise<UserModel> {
		const user = (
			await pool.query("SELECT * FROM users WHERE email =  $1", [email])
		).rows[0];
		return new UserModel(user.id, user.name, user.email, user.password);
	}
	async validatePassword(password: string) {
		const compare = await bcrypt.compare(password, this.password);
		return compare;
	}
}
export default UserModel;
