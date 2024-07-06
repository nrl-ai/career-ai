/*
  Warnings:

  - You are about to drop the column `applicationTrackerData` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "applicationTrackerData",
ADD COLUMN     "jobApplications" JSONB NOT NULL DEFAULT '{}';
