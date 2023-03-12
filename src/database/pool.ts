import "dotenv/config";

import { Pool } from "pg";

export default new Pool({
	max: 20,
	connectionString: `postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DB_NAME}`,
	idleTimeoutMillis: 30000,
});
