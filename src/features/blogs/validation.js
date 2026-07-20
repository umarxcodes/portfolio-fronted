import { z } from "zod";
import { nullableUrlField } from "@/lib/validators";

const base = z
  .object({
    title: z.string().trim().min(1),
    excerpt: z.string().trim().min(1).max(300),
    content: z.string().trim().min(1),
    coverImage: nullableUrlField,
    tags: z.array(z.string().trim().min(1)).optional(),
    category: z.string().trim().min(1).toLowerCase(),
    featured: z.boolean().optional(),
    published: z.boolean().optional(),
    seoTitle: z.string().trim().max(60).optional().nullable(),
    seoDescription: z.string().trim().max(160).optional().nullable(),
  })
  .strict();

export const createBlogSchema = base;

export const updateBlogSchema = base.partial().refine((data) => Object.keys(data).length > 0, {
  message: "At least one field is required",
});

export default { createBlogSchema, updateBlogSchema };
