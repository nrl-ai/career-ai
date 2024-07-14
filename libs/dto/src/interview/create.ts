import { z } from "nestjs-zod/z";
import { createZodDto } from "nestjs-zod/dto";
import { defaultResumeData, resumeDataSchema } from "@career-ai/schema";

export const createInterviewSchema = z.object({
    position: z.string().min(1),
    type: z.enum(["technical", "behavioral", "mixed"]).default("mixed"),
    yearOfExp: z.string(),
    jd: z.string(),
    cv: resumeDataSchema.default(defaultResumeData),
});

export class CreateInterviewDto extends createZodDto(createInterviewSchema) {}