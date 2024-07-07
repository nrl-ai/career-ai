/*
  Warnings:

  - You are about to drop the column `level` on the `Interviews` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Interviews` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Interviews" DROP COLUMN "level",
DROP COLUMN "year",
ADD COLUMN     "yearOfExp" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "model" SET DEFAULT 'gpt-3.5',
ALTER COLUMN "cv" SET DEFAULT '{}';
