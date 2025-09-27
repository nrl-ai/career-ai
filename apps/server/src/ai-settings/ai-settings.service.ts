import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { CreateAISettingsDto, UpdateAISettingsDto } from "@career-ai/dto";

@Injectable()
export class AISettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserId(userId: string) {
    return this.prisma.aISettings.findUnique({
      where: { userId },
    });
  }

  async createOrUpdate(userId: string, data: CreateAISettingsDto | UpdateAISettingsDto) {
    return this.prisma.aISettings.upsert({
      where: { userId },
      create: {
        userId,
        ...data,
      },
      update: data,
    });
  }

  async delete(userId: string) {
    return this.prisma.aISettings.delete({
      where: { userId },
    });
  }

  async getDefaultSettings() {
    return {
      llmApiKey: null,
      llmBaseUrl: "https://api.openai.com/v1",
      llmModel: "gpt-5",
      llmProvider: "openai",
      elevenLabsApiKey: null,
    };
  }
}
