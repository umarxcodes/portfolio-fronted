import { z } from "zod";
import { dateString, optionalDateString } from "@/lib/validators";

const base = z
  .object({
    degree: z.string().trim().min(1),
    fieldOfStudy: z.string().trim().min(1),
    institution: z.string().trim().min(1),
    description: z.string().trim().optional().nullable(),
    grade: z.string().trim().optional().nullable(),
    startDate: dateString,
    endDate: optionalDateString,
    isCurrent: z.boolean().optional(),
    location: z.string().trim().optional().nullable(),
  })
  .strict();

const refineDates = (data, ctx) => {
  if (data.isCurrent && data.endDate) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["endDate"],
      message: "endDate must be null when isCurrent is true",
    });
  }
  if (data.endDate && data.startDate && data.endDate < data.startDate) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["endDate"],
      message: "endDate must be after startDate",
    });
  }
};

export const createEducationSchema = base.superRefine(refineDates);

export const updateEducationSchema = base
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  })
  .superRefine(refineDates);

export default { createEducationSchema, updateEducationSchema };
