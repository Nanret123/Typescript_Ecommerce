import express, { Request } from "express";
import asyncHandler from "express-async-handler";
import { ProductModel } from "../models/productModel";
import { SampleProducts, sampleUsers } from "../data";
import { UserModel } from "../models/userModel";

export const seedRouter = express.Router();

seedRouter.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    await ProductModel.deleteMany({});
    const createdProducts = await ProductModel.insertMany(SampleProducts);

    const createdUsers = await UserModel.insertMany(sampleUsers);

    res.json({ createdProducts, createdUsers });
  })
);
