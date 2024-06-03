import { initMongoDB } from "./daos/mongodb/connection.js";
import express from "express";
import morgan from "morgan";
import productRouter from "./routes/productRouter.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import 'dotenv/config'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use('/products', productRouter);
app.use(errorHandler);
initMongoDB();

const PORT = 8080;

app.listen(PORT, () => console.log(`Server OK en el puerto ${PORT}`));
