import { Router } from "express";
import { getScore, createScore, getGameScore } from "../controllers/scoreController";
import { usernameValidator, gameIdValidator } from "../util/validators";
const scoreRoute = Router();

scoreRoute.get("/", getScore);
scoreRoute.post("/:gameid", usernameValidator.concat(gameIdValidator), createScore);
scoreRoute.get("/:gameid",  gameIdValidator, getGameScore);

export default scoreRoute;