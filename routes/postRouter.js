import express from "express";
import { createPost, fetchPost, updatePost } from "../controllers/postController.js";
import { verifyUser } from "../middleware.js";

const postRouter = express.Router();

postRouter.get("/fetch", fetchPost);
postRouter.post("/create", verifyUser, createPost);
// postRouter.post("/update/:id").post(updatePost);

export default postRouter;
