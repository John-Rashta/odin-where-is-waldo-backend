/*
  Warnings:

  - You are about to drop the column `scoreid` on the `Game` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[gameid]` on the table `Scoreboard` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gameid` to the `Scoreboard` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_scoreid_fkey";

-- DropIndex
DROP INDEX "Game_scoreid_key";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "scoreid";

-- AlterTable
ALTER TABLE "Scoreboard" ADD COLUMN     "gameid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Scoreboard_gameid_key" ON "Scoreboard"("gameid");

-- AddForeignKey
ALTER TABLE "Scoreboard" ADD CONSTRAINT "Scoreboard_gameid_fkey" FOREIGN KEY ("gameid") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
