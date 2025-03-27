import "dotenv/config";

import { App } from "./app";

const app = new App();
const PORT = process.env.PORT || 3000;

app.app.listen(PORT, () => {
	console.log(`Server is listening on PORT ${PORT}`);
});
