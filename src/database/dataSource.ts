import { DataSource } from "typeorm";

import { Activity } from "../entity/Activity";
import { Attendance } from "../entity/Attendance";
import { Category } from "../entity/Category";
import { Comment } from "../entity/Comment";
import { Event } from "../entity/Event";
import { Favorite } from "../entity/Favorite";
import { Plan } from "../entity/Plan";
import { Token } from "../entity/Token";
import { User } from "../entity/User";

const PostgresDataSource = new DataSource({
	type: "postgres",
	host: process.env.PG_HOST,
	port: process.env.PG_PORT ? parseInt(process.env.PG_PORT) : 5432,
	username: process.env.PG_USER,
	password: process.env.PG_PASSWORD,
	database: process.env.PG_DB_NAME,
	entities: [
		Activity,
		Attendance,
		Category,
		Comment,
		Event,
		Favorite,
		Plan,
		Token,
		User,
	],
});

export default PostgresDataSource;
