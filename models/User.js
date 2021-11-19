import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    nickname: { type: String, required: true, trim: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String },
});

const User = mongoose.model("User", UserSchema);

export default User;
