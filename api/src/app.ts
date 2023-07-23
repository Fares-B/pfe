import dotenv from "dotenv";

// import environment variable
if (process.env.NODE_ENV !== "production") {
	dotenv.config();
}
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

// import responseTime from "response-time";
import logger from "./lib/logger";
import routes from "./routes";
import middlewares from "./middlewares";
import { userRolesEnum } from "./models/type";
import componentsShema from "./docs/schemas";
import "./lib/db";

const app = express();

// middlewares cors and json
app.use(express.json());
app.use(cors());

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "PFE API",
			version: "0.0.1",
			description: "community product rating app via barcode",
			termsOfService: "http://example.com/terms/",
			contact: {
				name: "API Support",
				url: "http://www.exmaple.com/support",
				email: "support@example.com",
			},
		},

		servers: [
			{
				url: "http://localhost:3001",
				description: "Pfe API Server",
			},
		],

		components: componentsShema,
		security: [
			{
				bearerAuth: [],
			},
		],
	},
	apis: ["./src/docs/*.yaml"],
};

const specs = swaggerJsDoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
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

app.use("/products", routes.ProductRoutes);

app.use("/comments", routes.CommentRoutes);

app.use("/groups", routes.GroupRoutes);

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
