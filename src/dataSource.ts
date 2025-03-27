import "dotenv/config";

import { DataSource } from "typeorm";

const isDev = process.env.NODE_ENV === "development";
export const appDataSource = new DataSource({
	type: "postgres",
	host: process.env.PG_HOST,
	port: process.env.PG_PORT ? parseInt(process.env.PG_PORT) : 5432,
	username: process.env.PG_USER,
	password: process.env.PG_PASSWORD,
	database: process.env.PG_DB_NAME,
	synchronize: isDev,
	logging: isDev,
	entities: [isDev ? "src/entity/**/*.ts" : "dist/entity/**/*.js"],
	migrations: [isDev ? "src/migration/**/*.ts" : "dist/migration/**/*.js"],
});
