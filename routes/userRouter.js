import express from "express";

import { signup, signin, refresh, logout } from "../controllers/userController.js";
import { verifyUser } from "../middleware.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.get("/refresh", refresh);
userRouter.post("/signin", signin);
userRouter.post("/logout", logout);

export default userRouter;
