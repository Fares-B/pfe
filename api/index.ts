import app from "./src/app";
import logger from "./src/lib/logger";


const port = process.env.PORT || 3001;

app.listen(port, () => logger.info(`Server is listening on port ${port}`));
