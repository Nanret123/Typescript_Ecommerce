import { Request, Response } from "express";
import { ProductModel } from "../models/productModel";
import asyncHandler from "express-async-handler";

export const getAllProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const products = await ProductModel.find();
    res.json(products);
  }
);

export const getSingleProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await ProductModel.findOne({ _id: id });
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product Not Found" });
  }
});

export const getAllCategories = asyncHandler(
  async (req: Request, res: Response) => {
    const categories = await ProductModel.find().distinct("category");
    res.json(categories);
  }
);
