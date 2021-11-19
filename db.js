import mongoose from "mongoose";

const handleConnect = () => {
    console.log("✅DB연결에 성공하였습니다.");
};

const handleError = () => {
    console.log(`❌DB연결에 실패하였습니다. 오류내용 : ${error}`);
};

try {
    await mongoose.connect(
        "mongodb+srv://handygymadmin:SRjGGbdoqDr2TcPD@cluster0.ykknl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    );
    handleConnect();
} catch (error) {
    handleError(error);
}
