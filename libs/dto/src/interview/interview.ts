import { idSchema, resumeDataSchema, defaultResumeData } from "@career-ai/schema";
import { userSchema } from "../user";
import { createZodDto } from "nestjs-zod/dto";
import { interviewContentSchema } from "@career-ai/schema";
import { z } from "nestjs-zod/z";

export const interviewSchema = z.object({
  id: idSchema,
  position: z.string(),
  type: z.enum(["techincal", "behavioral", "combination"]).default("combination"),
  jd: z.string(),
  content: interviewContentSchema,
  language: z.enum(["VN", "EN", "KR"]).default("EN"),
  createdAt: z.date().or(z.dateString()),
  updatedAt: z.date().or(z.dateString()),
  model: z.string().default("gpt-3.5-turbo-0125"),
  userId: idSchema,
  user: userSchema,
  cv: resumeDataSchema.default(defaultResumeData),
  accuracyRate: z.number().int().default(0),
  communication: z.number().int().default(0),
  responseRate: z.number().int().default(0),
  totalScore: z.number().int().default(0),
  feedback: z.string().default(""),
});

export class InterviewDto extends createZodDto(interviewSchema) {}
