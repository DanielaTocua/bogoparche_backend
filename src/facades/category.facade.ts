import { GenericArrayResponse } from "../dtos/genericArrayResponse.dto";
import categoryService from "../services/category.service";

class categoryFacade {
	async getAll(): Promise<GenericArrayResponse<{id_categoria:string,nombre_categoria:string }>> {
		return {
			data: await categoryService.getAll(),
		};
	}
}

export default new categoryFacade();
