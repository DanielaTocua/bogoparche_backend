import pool from "../database/pool";

class categoryService {
	async getAll(): Promise<string[]> {
		const query = (await pool.query("SELECT * FROM category")).rows;

		const categories = query.reduce((acc, obj) => {
			acc[obj.id] = obj.nombre_categoria;
			return acc;
		}, {});
		return categories;
	}
}

export default new categoryService();
