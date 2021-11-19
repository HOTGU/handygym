import Address from "../models/Address.js";

export const search = async (req, res) => {
    const { term } = req.query;
    try {
        if (term === "" || term === undefined || term === null) {
            return res.json({ searchedAddress: [], message: "검색단어를 입력해주세요" });
        }
        const searchedAddress = await Address.find({ dong: { $regex: term } });

        res.json(searchedAddress);
    } catch (error) {
        console.log(error);
    }
};
