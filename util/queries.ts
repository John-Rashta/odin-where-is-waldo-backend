import prisma from "../config/client";
import { CharCreation, gameCreation, scoreCreation } from "./type/interfaces";

const createCharacter = async function createCharacterInDatabase(charInfo : CharCreation ) {
    await prisma.character.create({
        data: {
            name: charInfo.name,
            coordX: charInfo.coordX,
            coordY: charInfo.coordY,
            url: charInfo.url,
            map: {
                connect: {
                    id: charInfo.mapid
                }
            }
        }
    })
};

const getCharactersForImage = async function getAllCharactersForSpecificImage( mapid : number) {
    const allChars = await prisma.character.findMany({
        where: {
            mapid: mapid
        }
    });

    return allChars;
};

const startGame = async function startGameInDatabase(gameInfo: gameCreation) {
    await prisma.game.create({
        data: {
            startTime: gameInfo.startTime,
            status: "inProgress",
            gameChars : {
                connect : [
                    ...gameInfo.chars
                ]
            }
        }
    });
};

const getGame = async function getGameFromDatabase(gameid: string) {
    const foundGame = await prisma.game.findFirst({
        where:{
            id: gameid
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

const endGame = async function endGameInDatabase(gameid: string, endTime: Date) {
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
    const score = prisma.scoreboard.findMany({
        orderBy: {
            time: 'desc'
        }
    });
    
    return score;
};

const addToScoreboard = async function addToScoreboardFinishedGame(scoreInfo : scoreCreation) {
    const score = prisma.scoreboard.create({
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





export {
    createCharacter,
    getCharactersForImage,
    startGame,
    updateMarker,
    getGame,
    endGame,
    getScoreboard,
    addToScoreboard,
};