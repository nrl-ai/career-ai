import { idSchema } from "@career-ai/schema";
import { createZodDto } from "nestjs-zod/dto";
import { z } from "nestjs-zod/z";

export const aiSettingsSchema = z.object({
  id: idSchema,
  llmApiKey: z.string().nullable().optional(),
  llmBaseUrl: z.string().url().default("https://api.openai.com/v1"),
  llmModel: z.string().default("gpt-5"),
  llmProvider: z.enum(["openai", "azure", "anthropic", "custom"]).default("openai"),
  elevenLabsApiKey: z.string().nullable().optional(),
  userId: idSchema,
  createdAt: z.date().or(z.dateString()),
  updatedAt: z.date().or(z.dateString()),
});

export const createAISettingsSchema = aiSettingsSchema.pick({
  llmApiKey: true,
  llmBaseUrl: true,
  llmModel: true,
  llmProvider: true,
  elevenLabsApiKey: true,
});

export const updateAISettingsSchema = createAISettingsSchema.partial();

export class AISettingsDto extends createZodDto(aiSettingsSchema) {}
export class CreateAISettingsDto extends createZodDto(createAISettingsSchema) {}
export class UpdateAISettingsDto extends createZodDto(updateAISettingsSchema) {}
