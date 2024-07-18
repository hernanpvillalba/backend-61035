import { initMongoDB } from "./db/connection.js";
import express, {json, urlencoded} from "express";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler.js";
import 'dotenv/config';
import MainRouter from "./routes/index.js";

const mainRouter = new MainRouter();

const app = express();

app
    .use(json())
    .use(urlencoded({ extended: true }))
    .use(morgan("dev"))
    .use('/api', mainRouter.getRouter())
    .use(errorHandler)

const PERSISTENCE = process.env.PERSISTENCE;

if(PERSISTENCE === 'MONGO') initMongoDB();

const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>console.log(`Server OK PORT: ${PORT}`));