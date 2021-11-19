import mongoose from "mongoose";

const RefreshTokenSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        reauired: true,
    },
    token: { type: String, required: true },
    // 만기일 7일
    expireAt: { type: Date, default: Date.now(), index: { expires: 60 * 60 * 24 * 7 } },
});

const RefreshToken = mongoose.model("RefreshToken", RefreshTokenSchema);

export default RefreshToken;
