import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const PORT = process.env.PORT || 5000;
const DB_HOST = process.env.DB_HOST;

const handleConnect = () => {
    console.log("✅DB연결에 성공하였습니다.");
};

const handleListen = () => {
    console.log(`✅서버가 localhost://${PORT}에서 실행중입니다`);
};

try {
    await mongoose.connect(DB_HOST);
    handleConnect();
    app.listen(PORT, handleListen);
} catch (error) {
    console.log(`❌DB연결에 실패하였습니다. 오류내용 : ${error}`);
}
