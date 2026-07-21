import { z } from "zod";
import { searchTypeEnum } from "@/lib/validators";

export const searchSchema = z
  .object({
    q: z.string().trim().min(1),
    type: searchTypeEnum.optional(),
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().max(20).optional(),
  })
  .strict();

export default { searchSchema };
