import express, { Request, Response } from 'express'
import cors from "cors";
import path from 'path'
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
    origin: ["http://localhost:5173"],
  })
)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRouter);
app.use("/api/seed", seedRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/keys", keyRouter);

app.use(express.static(path.join(__dirname, 'public')));


app.use(express.static(path.join(__dirname, '../../frontend/dist')))
app.get('*', (req: Request, res: Response) =>
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
)


const PORT: number = parseInt((process.env.PORT || "3000") as string, 10);
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
