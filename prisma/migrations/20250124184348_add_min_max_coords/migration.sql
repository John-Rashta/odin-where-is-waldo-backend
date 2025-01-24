/*
  Warnings:

  - You are about to drop the column `coordX` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `coordY` on the `Character` table. All the data in the column will be lost.
  - Added the required column `coordXMax` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coordXMin` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coordYMax` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coordYMin` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "coordX",
DROP COLUMN "coordY",
ADD COLUMN     "coordXMax" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "coordXMin" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "coordYMax" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "coordYMin" DOUBLE PRECISION NOT NULL;
