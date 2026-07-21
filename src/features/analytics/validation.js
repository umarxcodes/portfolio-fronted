import { z } from "zod";
import { objectId } from "@/lib/validators";

export const trackEventSchema = z
  .object({
    type: z.enum(["portfolio_view", "project_view", "blog_view", "contact_submit"]),
    resourceId: objectId.optional().nullable(),
  })
  .strict();

export const analyticsRangeQuerySchema = z
  .object({
    months: z.coerce.number().int().positive().max(24).optional(),
  })
  .strict();

export default { trackEventSchema, analyticsRangeQuerySchema };
