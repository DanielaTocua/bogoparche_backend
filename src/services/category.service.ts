import pool from "../database/pool";

class categoryService {
	async getAll(): Promise<string[]> {
		const query = (await pool.query("SELECT * FROM categoria")).rows;

		const categories = query.reduce((acc, obj) => {
			acc[obj.id_categoria] = obj.nombre_categoria;
			return acc;
		}, {});
		return categories;
	}
}

export default new categoryService();
