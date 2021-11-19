import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import User from "../models/User.js";
import RefreshToken from "../models/refreshToken.js";

export const signup = async (req, res) => {
    const { nickname, email, password, confirmPassword } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if (existingUser)
            return res.status(400).json({ message: "이메일로 가입한 유저가 있습니다" });

        if (password !== confirmPassword)
            return res.status(400).json({ message: "비밀번호가 같지 않습니다" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await User.create({ nickname, email, password: hashedPassword });

        await newUser.save();

        return res.status(200).json({ message: "회원가입 성공" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "뭔가 문제가 있습니다" });
    }
};

const createAccessToken = (user) => {
    return jwt.sign(
        { nickname: user.nickname, _id: user._id },
        process.env.TOKEN_SECRET,
        {
            expiresIn: "15m",
        }
    );
};

const createRefreshToken = (user) => {
    return jwt.sign(
        { nickname: user.nickname, _id: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
    );
};

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser)
            return res.status(400).json({ message: "가입한 이메일이 없습니다" });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect)
            return res.status(400).json({ message: "비밀번호가 틀립니다" });

        const accessToken = createAccessToken(existingUser);
        const refreshToken = createRefreshToken(existingUser);

        await RefreshToken.create({
            userId: existingUser._id,
            token: refreshToken,
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: false,
        });

        res.status(200).json({
            userInfo: { nickname: existingUser.nickname, id: existingUser._id },
            accessToken,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "뭔가 문제가 있습니다" });
    }
};

export const refresh = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken)
        return res.status(401).json({ message: "로그인 인증이 안되었습니다" });
    try {
        const existingToken = await RefreshToken.exists({ token: refreshToken });

        if (!existingToken)
            return res.status(403).json({ message: "인증되지 않은 토큰입니다" });

        const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        await RefreshToken.deleteOne({ token: refreshToken });

        const newAccessToken = createAccessToken(user);
        const newRefreshToken = createRefreshToken(user);

        await RefreshToken.create({
            userId: user._id,
            token: newRefreshToken,
        });

        res.cookie("refreshToken", "", { maxAge: 0 });

        res.cookie("refreshToken", newRefreshToken, { httpOnly: false });

        return res.status(200).json({
            userInfo: { nickname: user.nickname, id: user._id },
            accessToken: newAccessToken,
        });
    } catch (error) {
        return res.status(401).json({ message: "뭔가 문제가 있습니다" });
    }
};

export const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    try {
        console.log("실행");
        await RefreshToken.deleteOne({ token: refreshToken });

        res.cookie("refreshToken", "", { maxAge: 0 });

        return res.status(200).json({ message: "로그아웃하였습니다" });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "로그아웃 실패" });
    }
};
