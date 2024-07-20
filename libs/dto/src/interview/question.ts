import { idSchema, resumeDataSchema, defaultResumeData } from "@career-ai/schema";
import { userSchema } from "../user";
import { createZodDto } from "nestjs-zod/dto";
import { interviewContentSchema } from "@career-ai/schema";
import { z } from "nestjs-zod/z";

export const interviewQuestionSchema = z.object({
  position: z.string(),
  type: z.string(),
  jd: z.string(),
  content: interviewContentSchema,
  language: z.string(),
  cv: resumeDataSchema.default(defaultResumeData),
});

export class InterviewQuestionDto extends createZodDto(interviewQuestionSchema) {}
