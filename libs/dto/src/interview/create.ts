import { z } from "nestjs-zod/z";
import { createZodDto } from "nestjs-zod/dto";
import { defaultResumeData, resumeDataSchema } from "@career-ai/schema";

export const createInterviewSchema = z.object({
  position: z.string().min(1),
  jd: z.string(),
  cv: resumeDataSchema.default(defaultResumeData),
  interviewer: z.string(),
});

export class CreateInterviewDto extends createZodDto(createInterviewSchema) {}
