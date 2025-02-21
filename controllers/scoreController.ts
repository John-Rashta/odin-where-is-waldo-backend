import asyncHandler from "express-async-handler";
import { matchedData } from "express-validator";
import { validationErrorMiddleware } from "../middleware/validationErrorMiddleware";
import {
  getScoreboard,
  addToScoreboard,
  getGame,
  getScoreByGame,
} from "../util/queries";
import { paddTo2Digits, paddTo3Digits } from "../util/padder";

const getScore = asyncHandler(async (req, res) => {
  const scoreData = await getScoreboard();

  if (scoreData.length < 1) {
    res.json({ message: "No entries in Scoreboard." });
    return;
  }

  res.json({ scores: scoreData });
  return;
});

const createScore = [
  validationErrorMiddleware,
  asyncHandler(async (req, res) => {
    const userData = matchedData(req);
    const findGame = await getGame(userData.gameid);
    if (!findGame) {
      res.status(400).json({ message: "Game Doesn't Exist" });
      return;
    }
    if (findGame.status !== "finished") {
      res.status(400).json({ message: "Invalid Game State" });
      return;
    }

    if (findGame.score) {
      res.status(400).json({ message: "Game Already Added" });
      return;
    }

    const miliSpent = Math.abs(
      Number(findGame.endTime) - Number(findGame.startTime),
    );
    const seconds = Math.floor(miliSpent / 1000);
    const minutes = Math.floor(seconds / 60);
    const realSeconds = seconds % 60;
    const realMinutes = minutes % 60;
    const realMili = miliSpent % 1000;

    const finalTime = `${paddTo2Digits(realMinutes)}:${paddTo2Digits(realSeconds)}:${paddTo3Digits(realMili)}`;

    await addToScoreboard({
      time: finalTime,
      username: userData.username,
      map: findGame.mapid,
      game: findGame.id,
    });
    res.status(200).json({ message: "Added to Scoreboard" });
    return;
  }),
];

const getGameScore = [
  validationErrorMiddleware,
  asyncHandler(async (req, res) => {
    const userData = matchedData(req);
    const findScore = await getScoreByGame(userData.gameid);

    if (!findScore) {
      res.status(400).json({ message: "Game not in Scoreboard" });
      return;
    }

    res.status(200).json({ score: findScore });
    return;
  }),
];

export { getScore, createScore, getGameScore };
