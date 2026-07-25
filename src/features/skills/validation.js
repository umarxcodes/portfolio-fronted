import { z } from "zod";
import { skillCategoryEnum, skillLevelEnum } from "@/lib/validators";

export const createSkillSchema = z
  .object({
    name: z.string().trim().min(1),
    category: skillCategoryEnum,
    level: skillLevelEnum,
    yearsOfExperience: z.coerce.number().min(0).max(50),
    icon: z.string().trim().optional(),
    description: z.string().optional(),
    displayOrder: z.coerce.number().optional(),
  })
  .strict();

export const updateSkillSchema = createSkillSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });

export default { createSkillSchema, updateSkillSchema };
