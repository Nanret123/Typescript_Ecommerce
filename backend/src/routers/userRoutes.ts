import express from "express";

import {
  UserProfile,
  UserSignUp,
  UserSignin,
} from "../controllers/userControllers";
import { isAuth } from "../utils";

export const userRouter = express.Router();

userRouter.post("/signin", UserSignin);
userRouter.post("/signup", UserSignUp);
userRouter.put("/profile", isAuth, UserProfile);
