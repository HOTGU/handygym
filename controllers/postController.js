import Post from "../models/Post.js";

export const fetchPost = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({ message: "포스트를 찾을 수가 없습니다" });
    }
};

export const createPost = async (req, res) => {
    const { title, description, cost, location } = req.body;

    try {
        if (title === "" || location === "" || cost === "" || location == "") {
            return res.status(400).json({ message: "항목을 채우세요" });
        }
        const newPost = await Post.create({
            title,
            description,
            cost,
            location,
            creator: req.userId,
        });

        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        console.log(`러너포스트 생성하는 중 에러가 발생했습니다. 에러내용: ${error}`);
        res.status(400).json({ message: "뭔가 문제가 생겼습니다. 새로고침하세요" });
    }
};

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const postData = req.body;

    if (!Post.exists({ _id })) return res.status(404).send("no Post");

    const updatedPost = await Post.findByIdAndUpdate(_id, postData, { new: true });

    res.json(updatedPost);
};
