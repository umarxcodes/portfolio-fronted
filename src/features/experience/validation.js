import { z } from "zod";
import { employmentTypeEnum, dateString, optionalDateString, urlField } from "@/lib/validators";

const base = z
  .object({
    company: z.string().trim().min(1),
    position: z.string().trim().min(1),
    employmentType: employmentTypeEnum,
    location: z.string().trim().optional(),
    description: z.string().trim().min(1),
    responsibilities: z.array(z.string().trim()).optional(),
    technologies: z.array(z.string().trim()).optional(),
    startDate: dateString,
    endDate: optionalDateString,
    isCurrent: z.boolean().optional(),
    companyLogo: urlField,
  })
  .strict();

const refineDates = (data, ctx) => {
  if (data.isCurrent && data.endDate !== undefined && data.endDate !== null) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "endDate must be null when isCurrent is true",
      path: ["endDate"],
    });
  }
  if (data.endDate && data.startDate && data.endDate < data.startDate) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "endDate must be the same or after startDate",
      path: ["endDate"],
    });
  }
};

export const createExperienceSchema = base.superRefine(refineDates);

export const updateExperienceSchema = base
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  })
  .superRefine(refineDates);

export default { createExperienceSchema, updateExperienceSchema };
