import "dotenv/config";

import { App } from "./app";

const app = new App();

app.app.listen(process.env.PORT, () => {
	console.log(`Server is listening on PORT ${process.env.PORT}`);
});
