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
exports.getAllCategories = exports.getSingleProduct = exports.getAllProducts = void 0;
const productModel_1 = require("../models/productModel");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.getAllProducts = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield productModel_1.ProductModel.find();
    res.json(products);
}));
exports.getSingleProduct = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const product = yield productModel_1.ProductModel.findOne({ _id: id });
    if (product) {
        res.json(product);
    }
    else {
        res.status(404).json({ message: "Product Not Found" });
    }
}));
exports.getAllCategories = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield productModel_1.ProductModel.find().distinct("category");
    res.json(categories);
}));
