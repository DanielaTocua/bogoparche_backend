class HelloService {
	async hello(): Promise<string> {
		return "Hello World!";
	}
}

export default new HelloService();
