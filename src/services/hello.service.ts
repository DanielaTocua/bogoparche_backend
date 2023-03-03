class HelloService {
	async hello(): Promise<string> {
		return "hola";
	}
}

export default new HelloService();
