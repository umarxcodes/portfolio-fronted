import { z } from "zod";
import { optionalUrlOrEmpty, settingsThemeEnum } from "@/lib/validators";

export const updateSettingsSchema = z
  .object({
    siteTitle: z.string().trim().min(1).optional(),
    siteDescription: z.string().trim().min(1).optional(),
    seoTitle: z.string().trim().max(60).optional(),
    seoDescription: z.string().trim().max(160).optional(),
    keywords: z.array(z.string().trim()).optional(),
    socialLinks: z
      .object({
        github: optionalUrlOrEmpty,
        linkedin: optionalUrlOrEmpty,
        twitter: optionalUrlOrEmpty,
        youtube: optionalUrlOrEmpty,
      })
      .optional(),
    theme: settingsThemeEnum.optional(),
    logo: optionalUrlOrEmpty,
    favicon: optionalUrlOrEmpty,
    contactEmail: z.string().trim().email().or(z.literal("")).optional(),
    contactPhone: z.string().trim().optional(),
    maintenanceMode: z.boolean().optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });

export default { updateSettingsSchema };
