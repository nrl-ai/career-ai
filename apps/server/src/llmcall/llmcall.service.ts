import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from "@nestjs/common";
import { OpenAI } from "openai";
import { AISettingsService } from "../ai-settings/ai-settings.service";

@Injectable()
export class LLMCallService {
  constructor(private readonly aiSettingsService: AISettingsService) {}

  async query(content: any, userId?: string) {
    let apiKey = process.env["LLM_API_KEY"];
    let baseURL = process.env["LLM_BASE_URL"] || "https://api.openai.com/v1";

    // If userId is provided, try to get user's custom settings
    if (userId) {
      const userSettings = await this.aiSettingsService.findByUserId(userId);
      if (userSettings && userSettings.llmApiKey) {
        apiKey = userSettings.llmApiKey;
        baseURL = userSettings.llmBaseUrl;
      }
    }

    // Check if API key is available
    if (!apiKey) {
      throw new UnauthorizedException(
        "LLM API key is not configured. Please configure your API key in Settings.",
      );
    }

    try {
      // Here we use OpenAI as the common interface.
      // Other LLM Services will be integrated with LiteLLM's unified interface.
      // https://www.litellm.ai/
      const openai = new OpenAI({
        baseURL,
        apiKey,
      });

      const result = await openai.chat.completions.create(content);
      return result;
    } catch (error) {
      // Handle OpenAI API errors and convert them to appropriate HTTP exceptions
      if (error instanceof OpenAI.APIError) {
        switch (error.status) {
          case 400:
            throw new BadRequestException(`Invalid request to LLM API: ${error.message}`);
          case 401:
            throw new UnauthorizedException(
              `Invalid API key. Please check your LLM API key configuration: ${error.message}`,
            );
          case 402:
            throw new HttpException(
              `Payment required. Please check your billing details: ${error.message}`,
              HttpStatus.PAYMENT_REQUIRED,
            );
          case 429:
            if (error.message.includes("quota")) {
              throw new HttpException(
                `You have exceeded your API quota. Please check your plan and billing details. ${error.message}`,
                HttpStatus.TOO_MANY_REQUESTS,
              );
            } else {
              throw new HttpException(
                `Rate limit exceeded. Please try again later: ${error.message}`,
                HttpStatus.TOO_MANY_REQUESTS,
              );
            }
          case 500:
          case 502:
          case 503:
            throw new InternalServerErrorException(
              `LLM service is temporarily unavailable. Please try again later: ${error.message}`,
            );
          default:
            throw new InternalServerErrorException(`LLM API error: ${error.message}`);
        }
      }

      // Handle other types of errors
      throw new InternalServerErrorException(
        `Unexpected error while calling LLM API: ${error.message || "Unknown error"}`,
      );
    }
  }

  async getModelForUser(userId: string): Promise<string> {
    const userSettings = await this.aiSettingsService.findByUserId(userId);
    return userSettings?.llmModel || "gpt-5";
  }
}
