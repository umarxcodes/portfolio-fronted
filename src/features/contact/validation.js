import { z } from "zod";
import { email, contactStatusEnum } from "@/lib/validators";

export const submitContactSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    email,
    subject: z.string().trim().min(2).max(200),
    message: z.string().trim().min(10).max(2000),
  })
  .strict();

export const updateContactStatusSchema = z
  .object({
    status: contactStatusEnum,
  })
  .strict();

export default { submitContactSchema, updateContactStatusSchema };
