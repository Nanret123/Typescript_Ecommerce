"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const productRoutes_1 = require("./routers/productRoutes");
const userRoutes_1 = require("./routers/userRoutes");
const orderRoutes_1 = require("./routers/orderRoutes");
const keyRoutes_1 = require("./routers/keyRoutes");
const seedRouter_1 = require("./routers/seedRouter");
dotenv_1.default.config();
//"mongodb://localhost:27017/ts-ecommerce"
const databaseUrl = process.env.DATABASE_URL || "mongodb://localhost:27017/ts-ecommerce";
mongoose_1.default.set("strictQuery", true);
const app = (0, express_1.default)();
//'https://typescript-ecommerce-frontend.vercel.app'
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["http://localhost:5173"],
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/products", productRoutes_1.productRouter);
app.use("/api/seed", seedRouter_1.seedRouter);
app.use("/api/users", userRoutes_1.userRouter);
app.use("/api/orders", orderRoutes_1.orderRouter);
app.use("/api/keys", keyRoutes_1.keyRouter);
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(express_1.default.static(path_1.default.join(__dirname, '../../frontend/dist')));
app.get('*', (req, res) => res.sendFile(path_1.default.join(__dirname, '../../frontend/dist/index.html')));
const PORT = parseInt((process.env.PORT || "3000"), 10);
mongoose_1.default
    .connect(databaseUrl)
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server started at PORT ${PORT}`);
    });
})
    .catch(() => {
    console.log("Couldn't Connect to the database");
});
