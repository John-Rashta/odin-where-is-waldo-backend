import asyncHandler from "express-async-handler";
import { getImages } from "../util/queries";

const getAllImages = asyncHandler(
    async (req, res) => {
        const allImages = await getImages();
        res.status(200).json(allImages);
        return;
});

export {getAllImages};