import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import middlewares from './middlewares';
import { userRolesEnum } from './models/type';


const app = express();
app.use(express.json());
app.use(cors());

// import environment variable
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

// connect to db
import './lib/db';


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use("/users", middlewares.authentication, routes.UserRoutes);

app.use("/products", middlewares.authentication, routes.ProductRoutes);

app.use(
    "/bans",
    middlewares.authentication,
    middlewares.authorization({ role: userRolesEnum.MODERATOR }),
    routes.BanRoutes
);

app.use("/", routes.SecurityRoutes);

export default app;
