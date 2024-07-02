import { z } from "nestjs-zod/z";
import { createZodDto } from "nestjs-zod/dto";

export const createInterviewSchema = z.object({
    position: z.string().min(1),
    type: z.enum(["technical", "behavioral", "mixed"]).default("mixed"),
    level: z.string().min(1),
    year: z.number().int().default(0),
    jd: z.string(),
});

export class CreateInterviewDto extends createZodDto(createInterviewSchema) {}