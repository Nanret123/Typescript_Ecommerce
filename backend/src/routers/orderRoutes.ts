import express from "express";
import { isAuth } from "../utils";
import {
  createOrder,
  getOrderHistory,
  getOrders,
  successfulPayment,
} from "../controllers/orderControllers";

export const orderRouter = express.Router();

orderRouter.get("/:id", isAuth, getOrders);
orderRouter.post("/", isAuth, createOrder);
orderRouter.put("/:id/pay", isAuth, successfulPayment);
orderRouter.get("/mine", isAuth, getOrderHistory);
