import dotenv from "dotenv";

// import environment variable
if (process.env.NODE_ENV !== "production") {
	dotenv.config();
}

import app from "./src/app";

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server is listening on port ${port}`));
