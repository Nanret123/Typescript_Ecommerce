"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderHistory = exports.successfulPayment = exports.createOrder = exports.getOrders = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const orderModel_1 = require("../models/orderModel");
exports.getOrders = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield orderModel_1.OrderModel.findById(req.params.id);
    if (order) {
        res.json(order);
    }
    else {
        res.status(404).json({ message: "Order not found" });
    }
}));
exports.createOrder = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.orderItems.length === 0) {
        res.status(400).json({ message: "Cart is Empty" });
    }
    else {
        const createdOrder = yield orderModel_1.OrderModel.create({
            orderItems: req.body.orderItems.map((x) => (Object.assign(Object.assign({}, x), { product: x._id }))),
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id,
        });
        res.status(201).json({ message: "Order Created", order: createdOrder });
    }
}));
exports.successfulPayment = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield orderModel_1.OrderModel.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = new Date(Date.now());
        order.paymentResult = {
            paymentId: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
        };
        const updatedOrder = yield order.save();
        res.send({ order: updatedOrder, message: "Order Paid Successfully" });
    }
    else {
        res.status(404).json({ message: "Order Not Found" });
    }
}));
exports.getOrderHistory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield orderModel_1.OrderModel.find({ user: req.user._id });
    res.json(orders);
}));
