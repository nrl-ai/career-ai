import { idSchema, resumeDataSchema, defaultResumeData } from "@career-ai/schema";
import { userSchema } from "../user";
import { createZodDto } from "nestjs-zod/dto";
import { z } from "nestjs-zod/z";

export const interviewSchema = z.object({
  id: idSchema,
  position: z.string(),
  type: z.enum(["techincal", "behavioral", "mixed"]).default("mixed"),
  jd: z.string(),
  content: z.string().default(""),
  yearOfExp: z.string().default(""),
  createdAt: z.date().or(z.dateString()),
  updatedAt: z.date().or(z.dateString()),
  score: z.number().default(0.0),
  model: z.string().default("gpt-3.5"),
  userId: idSchema,
  user: userSchema,
  cv: resumeDataSchema.default(defaultResumeData),
});

export class InterviewDto extends createZodDto(interviewSchema) {}
