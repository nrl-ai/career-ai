import { idSchema, resumeDataSchema, defaultResumeData } from "@career-ai/schema";
import { userSchema } from "../user";
import { createZodDto } from "nestjs-zod/dto";
import { z } from "nestjs-zod/z";

export const interviewSchema = z.object({
  id: idSchema,
  position: z.string(),
  type: z.enum(["techincal", "behavioral", "combination"]).default("combination"),
  jd: z.string(),
  content: z.json().array().default([]),
  language: z.enum(["VN", "EN", "KR"]).default("EN"),
  createdAt: z.date().or(z.dateString()),
  updatedAt: z.date().or(z.dateString()),
  model: z.string().default("gpt-5"),
  userId: idSchema,
  user: userSchema,
  cv: resumeDataSchema.default(defaultResumeData),
  accuracyRate: z.number().int().default(0),
  communication: z.number().int().default(0),
  responseRate: z.number().int().default(0),
  totalScore: z.number().int().default(0),
  feedback: z.string().default(""),
  interviewer: z.string().default("andrew"),
});

export class InterviewDto extends createZodDto(interviewSchema) {}
