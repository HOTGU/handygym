import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";

import postRouter from "./routes/postRouter.js";
import addressRouter from "./routes/addressRouter.js";
import userRouter from "./routes/userRouter.js";

const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/post", postRouter);
app.use("/address", addressRouter);
app.use("/user", userRouter);

export default app;
