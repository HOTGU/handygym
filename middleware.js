import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const accessToken = authHeader.split(" ")[1];
        const user = jwt.verify(accessToken, process.env.TOKEN_SECRET);
        req.userId = user._id;
        return next();
    } else {
        return res.status(403).json({ message: "로그인해야 합니다" });
    }
};
