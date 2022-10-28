import mongoose from "mongoose";
import logger from "./logger";

const MONGODB_CONNECTION_STR = process.env.MONGODB_CONNECTION_STR || "";

if (!MONGODB_CONNECTION_STR) {
  logger().error(
    "Database connection string is not defined [MONGODB_CONNECTION_STR] in .env file",
  );
  process.exit(1);
}

mongoose.connect(MONGODB_CONNECTION_STR);

const db = mongoose.connection;

db.on("error", (err) => {
  logger().warn(err);
  mongoose.connect(MONGODB_CONNECTION_STR);
});

db.once("open", () => logger().info("Database connection established"));

export default db;
