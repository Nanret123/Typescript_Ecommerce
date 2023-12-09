import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { productRouter } from "./routers/productRoutes";
import { userRouter } from "./routers/userRoutes";
import { orderRouter } from "./routers/orderRoutes";
import { keyRouter } from "./routers/keyRoutes";
import { seedRouter } from "./routers/seedRouter";

dotenv.config();

//"mongodb://localhost:27017/ts-ecommerce"
const databaseUrl = process.env.DATABASE_URL;
mongoose.set("strictQuery", true);

const app = express();

//'https://typescript-ecommerce-frontend.vercel.app'
app.use(
  cors({
    credentials: true,
    origin: ["https://typescript-ecommerce-frontend.vercel.app"],
  })
)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRouter);
app.use("/api/seed", seedRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/keys", keyRouter);


const PORT = 3000;
mongoose
  .connect(databaseUrl)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started at PORT ${PORT}`);
    });
  })
  .catch(() => {
    console.log("Couldn't Connect to the database");
  });
