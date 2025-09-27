import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateAISettingsDto, UpdateAISettingsDto, UserDto } from "@career-ai/dto";

import { User } from "../user/decorators/user.decorator";
import { JwtGuard } from "../auth/guards/jwt.guard";
import { TwoFactorGuard } from "../auth/guards/two-factor.guard";

import { AISettingsService } from "./ai-settings.service";

@ApiTags("AI Settings")
@Controller("ai-settings")
@UseGuards(JwtGuard, TwoFactorGuard)
export class AISettingsController {
  constructor(private readonly aiSettingsService: AISettingsService) {}

  @Get()
  async find(@User() user: UserDto) {
    const settings = await this.aiSettingsService.findByUserId(user.id);
    const defaultSettings = await this.aiSettingsService.getDefaultSettings();
    const result = settings || defaultSettings;

    // Return settings without exposing API keys for security
    return {
      llmBaseUrl: result.llmBaseUrl,
      llmModel: result.llmModel,
      llmProvider: result.llmProvider,
      // Don't send actual API keys to client
      llmApiKey: null,
      elevenLabsApiKey: null,
    };
  }

  @Get("status")
  async getStatus(@User() user: UserDto) {
    const settings = await this.aiSettingsService.findByUserId(user.id);

    return {
      hasLlmApiKey: !!settings?.llmApiKey,
      hasElevenLabsApiKey: !!settings?.elevenLabsApiKey,
      isConfigured: !!(settings?.llmApiKey || settings?.elevenLabsApiKey),
      llmProvider: settings?.llmProvider || "openai",
      llmModel: settings?.llmModel || "gpt-5",
    };
  }

  @Post()
  async create(@User() user: UserDto, @Body() createAISettingsDto: CreateAISettingsDto) {
    return this.aiSettingsService.createOrUpdate(user.id, createAISettingsDto);
  }

  @Patch()
  async update(@User() user: UserDto, @Body() updateAISettingsDto: UpdateAISettingsDto) {
    return this.aiSettingsService.createOrUpdate(user.id, updateAISettingsDto);
  }

  @Delete()
  async remove(@User() user: UserDto) {
    return this.aiSettingsService.delete(user.id);
  }
}
