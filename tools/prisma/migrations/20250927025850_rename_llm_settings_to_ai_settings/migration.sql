/*
  Warnings:

  - You are about to drop the `LLMSettings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LLMSettings" DROP CONSTRAINT "LLMSettings_userId_fkey";

-- DropTable
DROP TABLE "LLMSettings";

-- CreateTable
CREATE TABLE "AISettings" (
    "id" TEXT NOT NULL,
    "llmApiKey" TEXT,
    "llmBaseUrl" TEXT NOT NULL DEFAULT 'https://api.openai.com/v1',
    "llmModel" TEXT NOT NULL DEFAULT 'gpt-5',
    "llmProvider" TEXT NOT NULL DEFAULT 'openai',
    "elevenLabsApiKey" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AISettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AISettings_userId_key" ON "AISettings"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AISettings_userId_id_key" ON "AISettings"("userId", "id");

-- AddForeignKey
ALTER TABLE "AISettings" ADD CONSTRAINT "AISettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
