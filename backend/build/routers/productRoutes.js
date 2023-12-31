"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const productControllers_1 = require("../controllers/productControllers");
exports.productRouter = express_1.default.Router();
exports.productRouter.get("/", productControllers_1.getAllProducts);
exports.productRouter.get("/singleProduct/:slug", productControllers_1.getSingleProduct);
exports.productRouter.get("/categories", productControllers_1.getAllCategories);
