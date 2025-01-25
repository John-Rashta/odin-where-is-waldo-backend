import { Router } from "express";
import { getAllImages } from "../controllers/imageController";

///TODO GET CONTROLLER
const imageRoute = Router();

///TODO PUT CONTROLLERS IN
imageRoute.get("/", getAllImages  );


export default imageRoute;
