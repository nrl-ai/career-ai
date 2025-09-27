import { idSchema } from "@career-ai/schema";
import { createZodDto } from "nestjs-zod/dto";
import { z } from "nestjs-zod/z";

export const deleteInterviewSchema = z.object({
  id: idSchema,
});

export class DeleteInterviewDto extends createZodDto(deleteInterviewSchema) {}
