"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = __importDefault(require("express"));
const utils_1 = require("../utils");
const orderControllers_1 = require("../controllers/orderControllers");
exports.orderRouter = express_1.default.Router();
exports.orderRouter.get("/:id", utils_1.isAuth, orderControllers_1.getOrders);
exports.orderRouter.post("/", utils_1.isAuth, orderControllers_1.createOrder);
exports.orderRouter.put("/:id/pay", utils_1.isAuth, orderControllers_1.successfulPayment);
exports.orderRouter.get("/mine", utils_1.isAuth, orderControllers_1.getOrderHistory);
