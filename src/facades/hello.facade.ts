import { GenericResponse } from "../dtos/genericResponse.dto";
import helloService from "../services/hello.service";

class HelloFacade {
	async hello(): Promise<GenericResponse<string>> {
		return {
			data: await helloService.hello(),
		};
	}
}

export default new HelloFacade();
