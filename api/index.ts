import dotenv from 'dotenv';
import express from 'express';
import routes from './src/routes';
import middlewares from './src/middlewares';

const app = express();
app.use(express.json());

// import environment variable
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();

}

// connect to db
import './src/lib/db';

const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/users", middlewares.authentication, routes.UserRoutes);

app.use("/security", routes.SecurityRoutes);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
