import prisma from "../config/client";
import { CharCreation, gameCreation, imageCreation, scoreCreation } from "./type/interfaces";

/// POOL AND TESTING QUERIES
const createCharacter = async function createCharacterInDatabase(charInfo : CharCreation ) {
    await prisma.character.create({
        data: {
            name: charInfo.name,
            coordXMax: charInfo.coordXMax,
            coordYMax: charInfo.coordYMax,
            coordXMin: charInfo.coordXMin,
            coordYMin: charInfo.coordYMin,
            url: charInfo.url,
            map: {
                connect: {
                    id: charInfo.mapid
                }
            }
        }
    })
};

const createImage = async function createImageInDatabase(imageInfo: imageCreation) {
    await prisma.image.create({
        data: {
            name: imageInfo.name,
            url: imageInfo.url
        }
    })
};

const deleteGames = async function deleteGamesFromDatabase() {
    await prisma.game.deleteMany();
};

const deleteScores = async function deleteScoresFromDatabase() {
    await prisma.scoreboard.deleteMany();
};

/// END OF POOL AND TESTING QUERIES
const getCharactersForImage = async function getAllCharactersForSpecificImage( mapid : number) {
    const allChars = await prisma.character.findMany({
        where: {
            mapid: mapid
        }
    });

    return allChars;
};

const startGame = async function startGameInDatabase(gameInfo: gameCreation) {
    
    const newGame = await prisma.game.create({
        data: {
            startTime: gameInfo.startTime,
            status: "inProgress",
            gameChars : {
                connect : [
                    ...gameInfo.chars
                ]
            },
            map: {
                connect: {
                    id: gameInfo.map
                }
            }
        }
    });

    return newGame;
};

const getGame = async function getGameFromDatabase(gameid: string) {
    const foundGame = await prisma.game.findFirst({
        where:{
            id: gameid
        },
        include: {
            gameChars: true,
            markers: true,
        }
    });
    
    return foundGame;
};

const updateMarker = async function updateMarkerInGameInDatabase(charid: string, gameid: string) {
    await prisma.game.update({
        where: {
            id: gameid
        },
        data : {
            markers : {
                connect: {
                    id: charid
                }
            }
        }
    });
};

const endGame = async function endGameInDatabase(gameid: string, endTime: string) {
    await prisma.game.update({
        where:{
            id: gameid
        },
        data:{
            endTime,
            status: "finished"
        }
    });
};

const getScoreboard = async function getScoreboardFromDatabase() {
    const score = await prisma.scoreboard.findMany({
        orderBy: {
            time: 'desc'
        }
    });
    
    return score;
};

const addToScoreboard = async function addToScoreboardFinishedGame(scoreInfo : scoreCreation) {
    const score = await prisma.scoreboard.create({
        data: {
            game: {
                connect: {
                    id: scoreInfo.game
                }
            },
            map: {
                connect: {
                    id: scoreInfo.map
                }
            },
            username: scoreInfo.username,
            time: scoreInfo.time
        }
    });

    return score;
};

const getImage = async function basicFunctionToCheckIfImageExists(imageid: number) {
    const findImage = await prisma.image.findFirst({
        where: {
            id: imageid
        }
    });

    return findImage;
};

const getImages = async function getAllImagesFromDatabase() {
    const allImages = await prisma.image.findMany({
        select: {
            id: true,
            name: true,
            url: true,

        }
    });

    return allImages;
}

export {
    createCharacter,
    getCharactersForImage,
    startGame,
    updateMarker,
    getGame,
    endGame,
    getScoreboard,
    addToScoreboard,
    getImage,
    getImages,
    createImage,
    deleteGames,
    deleteScores,
};