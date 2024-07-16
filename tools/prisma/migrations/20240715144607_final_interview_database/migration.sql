/*
  Warnings:

  - The values [mixed] on the enum `Type` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `score` on the `Interviews` table. All the data in the column will be lost.
  - The `content` column on the `Interviews` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Language" AS ENUM ('VN', 'EN', 'KR');

-- AlterEnum
BEGIN;
CREATE TYPE "Type_new" AS ENUM ('technical', 'behavioral', 'combination');
ALTER TABLE "Interviews" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Interviews" ALTER COLUMN "type" TYPE "Type_new" USING ("type"::text::"Type_new");
ALTER TYPE "Type" RENAME TO "Type_old";
ALTER TYPE "Type_new" RENAME TO "Type";
DROP TYPE "Type_old";
COMMIT;

-- AlterTable
ALTER TABLE "Interviews" DROP COLUMN "score",
ADD COLUMN     "accuracyRate" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "communication" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "language" "Language" NOT NULL DEFAULT 'EN',
ADD COLUMN     "responseRate" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalScore" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "type" DROP DEFAULT,
DROP COLUMN "content",
ADD COLUMN     "content" JSONB NOT NULL DEFAULT '{}',
ALTER COLUMN "model" SET DEFAULT 'gpt-3.5-turbo-0125';

-- DropEnum
DROP TYPE "Level";
