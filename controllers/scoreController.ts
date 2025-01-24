import asyncHandler from "express-async-handler";
import { matchedData } from "express-validator";
import { validationErrorMiddleware } from "../middleware/validationErrorMiddleware";
import { getScoreboard, addToScoreboard, getGame } from "../util/queries";

const getScore = asyncHandler(
    async (req, res) => {
        const scoreData = await getScoreboard();
        if (!scoreData) {
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
            };

            const miliSpent = findGame.endTime as number - findGame.startTime;
            const seconds = miliSpent / 1000;
            const minutes = seconds / 60;
            const realSeconds = seconds % 60;
            const realMinutes = minutes % 60;
            const realMili = miliSpent % 1000;

            const finalTime = `${realMinutes}:${realSeconds}:${realMili}`;

            await addToScoreboard({time: finalTime, username: userData.username, map: findGame.mapid, game: findGame.id});
            res.status(200).json();
            return;
        }
    )
    

]

export {
    getScore,
    createScore,
};