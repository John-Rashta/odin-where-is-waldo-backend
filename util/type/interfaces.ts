import { Prisma } from "@prisma/client";

interface CharCreation {
  name: string;
  coordXMax: number;
  coordYMax: number;
  coordXMin: number;
  coordYMin: number;
  url: string;
  mapid: number;
}

interface gameCreation {
  startTime: string;
  chars: Prisma.CharacterWhereUniqueInput[];
  map: number;
}

interface scoreCreation {
  time: string;
  username: string;
  map: number;
  game: string;
}

interface imageCreation {
  name: string;
  url: string;
}

export { CharCreation, gameCreation, scoreCreation, imageCreation };
