import "dotenv/config";

import pg from "pg";

const Pool = pg.Pool;
const pool = new Pool({
	user: process.env.PG_USER,
	host: process.env.PG_HOST,
	database: process.env.PG_DB_NAME,
	password: process.env.PG_PASSWORD,
	port: parseInt(process.env.PG_PORT || "3000"),
});

export default {
	query: (text: string, params?: any) => pool.query(text, params),
  };
