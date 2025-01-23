-- CreateTable
CREATE TABLE "Scoreboard" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Scoreboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3),
    "scoreid" TEXT,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "coordX" DOUBLE PRECISION NOT NULL,
    "coordY" DOUBLE PRECISION NOT NULL,
    "mapid" INTEGER NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_gameGoal" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_gameGoal_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_gameProgress" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_gameProgress_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Game_scoreid_key" ON "Game"("scoreid");

-- CreateIndex
CREATE INDEX "_gameGoal_B_index" ON "_gameGoal"("B");

-- CreateIndex
CREATE INDEX "_gameProgress_B_index" ON "_gameProgress"("B");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_scoreid_fkey" FOREIGN KEY ("scoreid") REFERENCES "Scoreboard"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_mapid_fkey" FOREIGN KEY ("mapid") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_gameGoal" ADD CONSTRAINT "_gameGoal_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_gameGoal" ADD CONSTRAINT "_gameGoal_B_fkey" FOREIGN KEY ("B") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_gameProgress" ADD CONSTRAINT "_gameProgress_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_gameProgress" ADD CONSTRAINT "_gameProgress_B_fkey" FOREIGN KEY ("B") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
