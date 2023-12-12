import express from "express";

import {
  getAllCategories,
  getAllProducts,
  getSingleProduct,
} from "../controllers/productControllers";

export const productRouter = express.Router();

productRouter.get("/", getAllProducts);

productRouter.get("/singleProduct/:slug", getSingleProduct);

productRouter.get("/categories", getAllCategories);

