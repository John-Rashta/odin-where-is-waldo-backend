import { Prisma } from "@prisma/client";

interface CharCreation {
    name : string,
    coordXMax : number,
    coordYMax : number,
    coordXMin : number,
    coordYMin : number,
    url: string,
    mapid: number

}

interface gameCreation {
    startTime: number,
    chars: Prisma.CharacterWhereUniqueInput[],
    map: number
}

interface scoreCreation {
    time: string,
    username: string,
    map: number,
    game: string
}

export { 
    CharCreation,
    gameCreation,
    scoreCreation,
};