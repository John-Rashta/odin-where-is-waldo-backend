import { Router } from "express";
import { getScore, createScore } from "../controllers/scoreController";
const scoreRoute = Router();

scoreRoute.get("/", getScore);
scoreRoute.post("/:gameid", );

export default scoreRoute;