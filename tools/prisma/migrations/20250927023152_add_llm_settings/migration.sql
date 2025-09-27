-- CreateTable
CREATE TABLE "LLMSettings" (
    "id" TEXT NOT NULL,
    "apiKey" TEXT,
    "baseUrl" TEXT NOT NULL DEFAULT 'https://api.openai.com/v1',
    "model" TEXT NOT NULL DEFAULT 'gpt-5',
    "provider" TEXT NOT NULL DEFAULT 'openai',
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LLMSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LLMSettings_userId_key" ON "LLMSettings"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "LLMSettings_userId_id_key" ON "LLMSettings"("userId", "id");

-- AddForeignKey
ALTER TABLE "LLMSettings" ADD CONSTRAINT "LLMSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
