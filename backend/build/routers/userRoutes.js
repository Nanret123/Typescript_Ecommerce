"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const userControllers_1 = require("../controllers/userControllers");
const utils_1 = require("../utils");
exports.userRouter = express_1.default.Router();
exports.userRouter.post("/signin", userControllers_1.UserSignin);
exports.userRouter.post("/signup", userControllers_1.UserSignUp);
exports.userRouter.put("/profile", utils_1.isAuth, userControllers_1.UserProfile);
