import { Router } from "express";
import { getScore, createScore } from "../controllers/scoreController";
import { usernameValidator, gameIdValidator } from "../util/validators";
const scoreRoute = Router();

scoreRoute.get("/", getScore);
scoreRoute.post("/:gameid", usernameValidator.concat(gameIdValidator), createScore);

export default scoreRoute;