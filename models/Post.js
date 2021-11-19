import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    cost: { type: String, required: true },
    location: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: new Date() },
});

const Post = mongoose.model("Post", PostSchema);

export default Post;
