import { z } from "zod";
import { dateString, optionalDateString, nullableUrlField } from "@/lib/validators";

const base = z
  .object({
    name: z.string().trim().min(1),
    issuer: z.string().trim().min(1),
    issueDate: dateString,
    expiryDate: optionalDateString,
    credentialId: z.string().trim().optional().nullable(),
    credentialUrl: nullableUrlField,
    description: z.string().trim().optional().nullable(),
    skills: z.array(z.string().trim().min(1)).optional(),
    badgeImage: nullableUrlField,
  })
  .strict();

export const createCertificateSchema = base.refine(
  (data) => !data.expiryDate || data.expiryDate > data.issueDate,
  { path: ["expiryDate"], message: "expiryDate must be after issueDate" }
);

export const updateCertificateSchema = base
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  })
  .refine((data) => !data.expiryDate || !data.issueDate || data.expiryDate > data.issueDate, {
    path: ["expiryDate"],
    message: "expiryDate must be after issueDate",
  });

export default { createCertificateSchema, updateCertificateSchema };
