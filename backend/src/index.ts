import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from 'path'
import { productRouter } from "./routers/productRoutes";
import { userRouter } from "./routers/userRoutes";
import { orderRouter } from "./routers/orderRoutes";
import { keyRouter } from "./routers/keyRoutes";
import { seedRouter } from "./routers/seedRouter";

dotenv.config();

//"mongodb://localhost:27017/ts-ecommerce"
const MONGODBURI = process.env.MONGODBURI;
mongoose.set("strictQuery", true);

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRouter);
app.use("/api/seed", seedRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/keys", keyRouter);


const PORT = 3000;
mongoose
  .connect(MONGODBURI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started at PORT ${PORT}`);
    });
  })
  .catch(() => {
    console.log("Couldn't Connect to the database");
  });
