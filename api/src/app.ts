import dotenv from "dotenv";

// import environment variable
if (process.env.NODE_ENV !== "production") {
	dotenv.config();
}
import express from "express";
import cors from "cors";
// import responseTime from "response-time";
import logger from "./lib/logger";
import routes from "./routes";
import middlewares from "./middlewares";
import { userRolesEnum } from "./models/type";
import "./lib/db";

const app = express();

// middlewares cors and json
app.use(express.json());
app.use(cors());

// log response time
// app.use(responseTime(logResponseTime));
// app.use(logError);

// middlewares add headers
app.use((req, res, next) => {
	res.append("Content-Range", "posts 0-24/319");
	res.append("Access-Control-Expose-Headers", "Content-Range");
	next();
});

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.use("/users", middlewares.authentication, routes.UserRoutes);

app.use("/products", middlewares.authentication, routes.ProductRoutes);

app.use("/comments", middlewares.authentication, routes.CommentRoutes);

app.use("/reports", middlewares.authentication, routes.ReportRoutes);

app.use(
	"/bans",
	middlewares.authentication,
	middlewares.authorization({ role: userRolesEnum.MODERATOR }),
	routes.BanRoutes,
);

app.use(
	"/rates",
	middlewares.authentication,
	routes.RateRoutes,
);

app.use("/", routes.SecurityRoutes);

export default app;
