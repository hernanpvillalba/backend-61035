import express from "express";
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartRouter.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use(errorHandler);

const PORT = 8080;
app.listen(PORT, () => console.log(`Server OK en el puerto ${PORT}`));
