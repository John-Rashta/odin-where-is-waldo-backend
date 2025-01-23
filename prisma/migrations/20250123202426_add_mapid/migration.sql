/*
  Warnings:

  - Added the required column `mapid` to the `Scoreboard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Scoreboard" ADD COLUMN     "mapid" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Scoreboard" ADD CONSTRAINT "Scoreboard_mapid_fkey" FOREIGN KEY ("mapid") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
