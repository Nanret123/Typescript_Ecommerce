"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleUsers = exports.SampleProducts = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.SampleProducts = [
    {
        name: "Nike Slim Shirt",
        slug: "nike-slim-shirt",
        image: "/images/nike-slim-shirt.jpeg",
        category: "Shirts",
        brand: "Nike",
        price: 120,
        countInStock: 10,
        description: "High Quality Shirt",
        rating: 4.5,
        numReviews: 10,
    },
    {
        name: "Adidas Fit Shirt",
        slug: "adidas-fit-shirt",
        image: "/images/adidas-fit-shirt.jpeg",
        category: "Shirts",
        brand: "Nike",
        price: 100,
        countInStock: 20,
        description: "High Quality Product",
        rating: 4.0,
        numReviews: 10,
    },
    {
        name: "Lacoste Free Pants",
        slug: "lacoste-free-pants",
        image: "/images/lacoste-free-pants.jpg",
        category: "Pants",
        brand: "Lacoste",
        price: 220,
        countInStock: 0,
        description: "High Quality Product",
        rating: 4.8,
        numReviews: 17,
    },
    {
        name: "Nike Slim Pant",
        slug: "nike-slim-pants",
        image: "/images/nike-slim-pants.png",
        category: "Pants",
        brand: "Lacoste",
        price: 78,
        countInStock: 15,
        description: "High Quality Product",
        rating: 4.5,
        numReviews: 14,
    },
];
exports.sampleUsers = [
    {
        name: "Joe",
        email: "admin@example.com",
        password: bcryptjs_1.default.hashSync("123456"),
        isAdmin: true,
    },
    {
        name: "John",
        email: "user@example.com",
        password: bcryptjs_1.default.hashSync("123456"),
        isAdmin: false,
    },
];
