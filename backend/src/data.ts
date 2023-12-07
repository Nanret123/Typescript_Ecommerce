import { Product } from "./models/productModel";
import bcrypt from "bcryptjs";
import { User } from "./models/userModel";

export const SampleProducts: Product[] = [
  {
    name: "Nike Slim Shirt",
    slug: "nike-slim-shirt",
    image: "/images/shoes.jpg",
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
    image: "/images/shoes.jpg",
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
    image: "/images/shoes.jpg",
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
    image: "/images/shoes.jpg",
    category: "Pants",
    brand: "Lacoste",
    price: 78,
    countInStock: 15,
    description: "High Quality Product",
    rating: 4.5,
    numReviews: 14,
  },
];

export const sampleUsers: User[] = [
  {
    name: "Joe",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456"),
    isAdmin: true,
  },
  {
    name: "John",
    email: "user@example.com",
    password: bcrypt.hashSync("123456"),
    isAdmin: false,
  },
];
