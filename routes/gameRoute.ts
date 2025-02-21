import { Router } from "express";
import {
  gameIdValidator,
  imageIdValidator,
  charInfoValidator,
} from "../util/validators";
import {
  createGame,
  updateGame,
  gameCharacters,
} from "../controllers/gameController";

const gameRoute = Router();

gameRoute.post("/", imageIdValidator, createGame);
gameRoute.put(
  "/:gameid",
  gameIdValidator.concat(charInfoValidator),
  updateGame,
);
gameRoute.get("/:gameid/characters", gameIdValidator, gameCharacters);

export default gameRoute;
