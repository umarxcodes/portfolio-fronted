import { z } from "zod";
import {
  projectCategoryEnum,
  projectStatusEnum,
  urlField,
  dateString,
  optionalDateString,
  urlFieldRequired,
} from "@/lib/validators";

const base = z
  .object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    shortDescription: z.string().trim().max(200),
    techStack: z.array(z.string().trim()).min(1),
    category: projectCategoryEnum,
    status: projectStatusEnum,
    featured: z.boolean().optional(),
    githubUrl: urlField,
    liveUrl: urlField,
    thumbnail: urlField,
    images: z.array(urlFieldRequired).optional(),
    startDate: dateString,
    endDate: optionalDateString,
  })
  .strict();

export const createProjectSchema = base.refine(
  (data) => !data.endDate || data.endDate >= data.startDate,
  { message: "endDate must be the same or after startDate", path: ["endDate"] }
);

export const updateProjectSchema = base
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  })
  .superRefine((data, ctx) => {
    if (data.startDate && data.endDate && data.endDate < data.startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "endDate must be the same or after startDate",
        path: ["endDate"],
      });
    }
  });

export default { createProjectSchema, updateProjectSchema };
