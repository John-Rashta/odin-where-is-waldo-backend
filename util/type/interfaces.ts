import { Prisma } from "@prisma/client";

interface CharCreation {
    name : string,
    coordX : number,
    coordY : number,
    url: string,
    mapid: number

}

interface gameCreation {
    startTime: Date,
    chars: Prisma.CharacterWhereUniqueInput[],
}

interface scoreCreation {
    time: Date,
    username: string,
    map: number,
    game: string
}

export { 
    CharCreation,
    gameCreation,
    scoreCreation,
};