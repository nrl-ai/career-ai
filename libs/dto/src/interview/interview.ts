import { idSchema, resumeDataSchema, defaultResumeData } from "@career-ai/schema";
import { userSchema } from "../user";
import { createZodDto } from "nestjs-zod/dto";
import { z } from "nestjs-zod/z";

export const interviewSchema = z.object({
    id: idSchema,
    position: z.string(),
    level: z.enum(["technical", "behavioral", "mixed"]).default("mixed"),
    type: z.enum(["intern", "fresher", "mid-junior", "junior", "mid-senior", "senior"]),
    jd: z.string(),
    content: z.string(),
    year: z.number().int().default(0),
    createdAt: z.date().or(z.dateString()),
    updatedAt: z.date().or(z.dateString()),
    score: z.string().regex(/^\d+(\.\d)?$/),
    model: z.string(),
    userId: idSchema,
    user: userSchema,
    cv: resumeDataSchema.default(defaultResumeData),
});

export class InterviewDto extends createZodDto(interviewSchema) {}