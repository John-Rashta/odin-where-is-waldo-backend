import { Router } from "express";
import { gameIdValidator, imageIdValidator, charInfoValidator } from "../util/validators";
import { createGame, updateGame, gameCharacters } from "../controllers/gameController";
///TODO GET CONTROLLER
const gameRoute = Router();

///TODO PUT CONTROLLERS IN
gameRoute.post("/", imageIdValidator, createGame );
gameRoute.put("/:gameid", gameIdValidator.concat(charInfoValidator), updateGame );
gameRoute.get("/:gameid/characters", gameIdValidator, gameCharacters);

export default gameRoute;


