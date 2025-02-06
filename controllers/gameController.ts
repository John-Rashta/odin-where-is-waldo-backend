import asyncHandler from "express-async-handler";
import { matchedData } from "express-validator";
import { validationErrorMiddleware } from "../middleware/validationErrorMiddleware";
import { getGame, getCharactersForImage, startGame, getImage, updateMarker, endGame } from "../util/queries";

const createGame = [
    validationErrorMiddleware,
    asyncHandler(
        async (req, res) => {
            const queryData = matchedData(req);
            let imageId;
            if (queryData.imageid) {
                imageId = queryData.imageid;
            } else {
                imageId = 1;
            }
            
            const checkIfImageExists = await getImage(imageId);

            if (!checkIfImageExists) {
                res.status(400).json();
                return;
            }
            
            const possibleChars = await getCharactersForImage(imageId);
            
            for (let i = possibleChars.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [possibleChars[i], possibleChars[j]] = [possibleChars[j], possibleChars[i]];
            };

            const selectedChars = possibleChars.slice(0, 3);

            const newGame = await startGame({
                startTime: String(Date.now()), 
                chars: selectedChars.map((char) => {
                    return {id: char.id}
                }),
                map: imageId  
            });
            
            res.status(200).json({game: newGame.id});
            return;
        }
    )
];

const updateGame = [
    validationErrorMiddleware,
    asyncHandler(
        async (req, res) => {
            const formData = matchedData(req);
            const gameData = await getGame(formData.gameid);
            if (!gameData) {
                res.status(400).json();
                return;
            }

            if (gameData?.status === "finished") {
                res.status(400).json({message: "Invalid Game State"});
                return;
            }

            const targetChar = gameData.gameChars.find((char) => char.id === formData.char);
            if (!targetChar) {
                res.status(400).json();
                return;
            };

            const checkCoords = (formData.coordX <= targetChar.coordXMax && formData.coordX >= targetChar.coordXMin &&
                formData.coordY <= targetChar.coordYMax && formData.coordY >= targetChar.coordYMin);
            
            if (!checkCoords) {
                res.status(400).json({message: "Incorrect Coordinates"});
                return;
            };

            await updateMarker(targetChar.id, gameData.id);

            if (gameData.markers.length + 1 === 3) {
                await endGame(gameData.id, String(Date.now()));
                res.status(200).json({message: "Game Finished"});
                return;
            };

            res.status(200).json({message: "Correct Coordinates"});
            return;
    })
]

const gameCharacters = [
    validationErrorMiddleware,
    asyncHandler(async (req, res) => {
        const formData = matchedData(req);
        const gameData = await getGame(formData.gameid);
        if (!gameData) {
            res.status(400).json();
            return;
        }

        if (gameData?.status === "finished") {
            res.status(400).json({message: "Game already finished"});
            return;
        }

        const charsInfo = gameData.gameChars.map((char) => {
            return {
                id: char.id,
                imageUrl: char.url,
                name: char.name
            }
        });

        res.status(200).json({chars: charsInfo});
        return;
})
]

export {
    createGame,
    updateGame,
    gameCharacters,
};

