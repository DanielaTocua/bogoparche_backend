import { GenericResponse } from "../dtos/genericResponse.dto";
import helloService from "../services/hello.service";

class AuthFacade {
	async auth(): Promise<GenericResponse<string>> {
		return {
			data: await helloService.hello(),
		};
	}
}

export default new AuthFacade();
