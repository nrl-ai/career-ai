-- CreateEnum
CREATE TYPE "Type" AS ENUM ('technical', 'behavioral', 'mixed');

-- CreateEnum
CREATE TYPE "Level" AS ENUM ('intern', 'fresher', 'mid_junior', 'junior', 'mid_senior', 'senior');

-- CreateTable
CREATE TABLE "Interviews" (
    "id" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "level" "Level" NOT NULL,
    "type" "Type" NOT NULL DEFAULT 'mixed',
    "jd" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "year" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "score" DECIMAL(10,1) NOT NULL,
    "model" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "cv" JSONB NOT NULL,

    CONSTRAINT "Interviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Interviews_userId_idx" ON "Interviews"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Interviews_userId_id_key" ON "Interviews"("userId", "id");

-- AddForeignKey
ALTER TABLE "Interviews" ADD CONSTRAINT "Interviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
