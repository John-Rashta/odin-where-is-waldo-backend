import asyncHandler from "express-async-handler";
import { matchedData } from "express-validator";
import { validationErrorMiddleware } from "../middleware/validationErrorMiddleware";
import { getGame, getCharactersForImage, startGame, getImage } from "../util/queries";

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
            }

            const possibleChars = await getCharactersForImage(imageId);

            for (let i = possibleChars.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [possibleChars[i], possibleChars[j]] = [possibleChars[j], possibleChars[i]];
            };

            const selectedChars = possibleChars.slice(0, 3);

            await startGame({
                startTime: Date.now(), 
                chars: selectedChars.map((char) => {
                    return {id: char.id}
                }),
                map: imageId  
            });

            const publicCharInfo = selectedChars.map((char) => {
                return {
                    id: char.id,
                    imageUrl: char.url,
                    name: char.name
                }
            });

            res.status(200).json({chars: publicCharInfo});
        }
    )
];

export {
    createGame
};

