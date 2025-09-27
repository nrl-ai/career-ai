import { idSchema } from "@career-ai/schema";
import { z } from "nestjs-zod/z";

export const payloadSchema = z.object({
  id: idSchema,
  isTwoFactorAuth: z.boolean().optional(),
});

export type Payload = z.infer<typeof payloadSchema>;
