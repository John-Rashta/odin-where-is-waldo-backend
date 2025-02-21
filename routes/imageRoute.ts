import { Router } from "express";
import { getAllImages } from "../controllers/imageController";

const imageRoute = Router();

imageRoute.get("/", getAllImages);

export default imageRoute;
