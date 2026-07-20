import { z } from "zod";
import { email as emailField, urlField } from "@/lib/validators";

const socialLinks = z
  .object({
    github: urlField,
    linkedin: urlField,
    portfolio: urlField,
    twitter: urlField,
  })
  .strict()
  .partial();

export const updateProfileSchema = z
  .object({
    name: z.string().trim().min(1).optional(),
    title: z.string().trim().min(1).optional(),
    bio: z.string().trim().min(1).optional(),
    shortBio: z.string().trim().max(160).optional(),
    email: emailField.optional(),
    phone: z.string().trim().optional(),
    location: z.string().trim().optional(),
    profileImage: urlField,
    resumeUrl: urlField,
    availability: z.boolean().optional(),
    yearsOfExperience: z.number().min(0).optional(),
    socialLinks: socialLinks.optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });

export default { updateProfileSchema };
