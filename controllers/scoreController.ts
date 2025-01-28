import asyncHandler from "express-async-handler";
import { matchedData } from "express-validator";
import { validationErrorMiddleware } from "../middleware/validationErrorMiddleware";
import { getScoreboard, addToScoreboard, getGame } from "../util/queries";
import { paddTo2Digits } from "../util/padder";

const getScore = asyncHandler(
    async (req, res) => {
        const scoreData = await getScoreboard();

        if (scoreData.length < 1) {
            res.json({message: "No entries in Scoreboard."});
            return;
        };
        
        res.json(scoreData);
        return;
    }
);

const createScore = [
    validationErrorMiddleware,
    asyncHandler(
        async (req, res) => {
            const userData = matchedData(req);
            const findGame = await getGame(userData.gameid);
            if (!findGame) {
                res.status(400).json();
                return;
            }
            if (findGame.status !== "finished") {
                res.status(400).json({message: "Invalid Game State"});
                return;
            };

            const miliSpent = Number(findGame.endTime) - Number(findGame.startTime);
            const seconds = Math.floor(miliSpent / 1000);
            const minutes = Math.floor(seconds / 60);
            const realSeconds = seconds % 60;
            const realMinutes = minutes % 60;
            const realMili = miliSpent % 1000;

            const finalTime = `${paddTo2Digits(realMinutes)}:${paddTo2Digits(realSeconds)}:${realMili}`;

            await addToScoreboard({time: finalTime, username: userData.username, map: findGame.mapid, game: findGame.id});
            res.status(200).json({message: "Added to Scoreboard"});
            return;
        }
    )
    

]

export {
    getScore,
    createScore,
};