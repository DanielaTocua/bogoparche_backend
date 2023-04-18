import pool from "../database/pool";

class categoryService {
	async getAll(): Promise<{id_categoria:string,nombre_categoria:string }[]> {
		const query = (await pool.query("SELECT * FROM categoria")).rows;

		const categories = query.reduce((acc, obj) => {
			acc[obj.nombre_categoria] = obj.id_categoria ;
			return acc;
		}, {});
		return categories;
	}
}

export default new categoryService();
