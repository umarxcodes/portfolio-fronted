import { z } from "zod";

// ObjectId shape used by the backend for :id params and references.
export const objectId = z
  .string()
  .trim()
  .regex(/^[a-f\d]{24}$/i, { message: "Invalid id" });

const emptyStringToUndefined = (value) => (value === "" ? undefined : value);

export const urlField = z.preprocess(
  emptyStringToUndefined,
  z.string().url({ message: "Invalid URL" }).optional()
);
export const nullableUrlField = z.preprocess(
  emptyStringToUndefined,
  z.string().url({ message: "Invalid URL" }).optional().nullable()
);
export const urlFieldRequired = z.string().url({ message: "Invalid URL" });

export const optionalUrlOrEmpty = z
  .string()
  .url({ message: "Invalid URL" })
  .or(z.literal(""))
  .optional();

// Reusable string date that accepts ISO strings (matches backend preprocess).
export const dateString = z.preprocess(
  (value) => {
    if (value instanceof Date) return value;
    if (typeof value === "string" && value.trim() !== "") return new Date(value);
    return value;
  },
  z.date({ invalid_type_error: "Invalid date" })
);

export const optionalDateString = z.preprocess(
  (value) => {
    if (value instanceof Date) return value;
    if (typeof value === "string" && value.trim() !== "") return new Date(value);
    if (value === "" || value === null) return null;
    return value;
  },
  z.date({ invalid_type_error: "Invalid date" }).nullable().optional()
);

// Strong password matching backend auth rule:
// 8-128 chars, lowercase, uppercase, number, special char.
export const strongPassword = (field = "Password") =>
  z
    .string()
    .min(8, { message: `${field} must be at least 8 characters` })
    .max(128, { message: `${field} must not exceed 128 characters` })
    .regex(/[a-z]/, { message: `${field} must include a lowercase letter` })
    .regex(/[A-Z]/, { message: `${field} must include an uppercase letter` })
    .regex(/\d/, { message: `${field} must include a number` })
    .regex(/[^A-Za-z0-9]/, {
      message: `${field} must include a special character`,
    });

export const loginPassword = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .max(128, { message: "Password must not exceed 128 characters" });

export const email = z
  .string()
  .email({ message: "Invalid email" })
  .trim()
  .transform((value) => value.toLowerCase());

// Enums (must match backend constants exactly).
export const PROJECT_CATEGORIES = [
  "frontend",
  "backend",
  "fullstack",
  "mobile",
  "devops",
  "ai",
  "open-source",
];
export const PROJECT_STATUSES = ["completed", "in-progress", "planned", "archived"];
export const SKILL_CATEGORIES = [
  "frontend",
  "backend",
  "database",
  "devops",
  "cloud",
  "testing",
  "tools",
  "mobile",
  "ai",
];
export const SKILL_LEVELS = ["beginner", "intermediate", "advanced", "expert"];
export const EMPLOYMENT_TYPES = ["full-time", "part-time", "contract", "freelance", "internship"];
export const CONTACT_STATUSES = ["unread", "read", "replied"];
export const UPLOAD_FOLDERS = ["profile", "projects", "blogs", "certificates", "resume"];
export const SETTINGS_THEMES = ["light", "dark", "system"];
export const SEARCH_TYPES = [
  "projects",
  "blogs",
  "skills",
  "experience",
  "education",
  "certificates",
];

export const projectCategoryEnum = z.enum(PROJECT_CATEGORIES);
export const projectStatusEnum = z.enum(PROJECT_STATUSES);
export const skillCategoryEnum = z.enum(SKILL_CATEGORIES);
export const skillLevelEnum = z.enum(SKILL_LEVELS);
export const employmentTypeEnum = z.enum(EMPLOYMENT_TYPES);
export const contactStatusEnum = z.enum(CONTACT_STATUSES);
export const uploadFolderEnum = z.enum(UPLOAD_FOLDERS);
export const settingsThemeEnum = z.enum(SETTINGS_THEMES);
export const searchTypeEnum = z.enum(SEARCH_TYPES);

// Upload constraints mirroring backend multer/validation rules.
export const UPLOAD_CONSTRAINTS = {
  profile: { accept: ["image/jpeg", "image/png", "image/webp"], maxSize: 5 * 1024 * 1024 },
  projects: { accept: ["image/jpeg", "image/png", "image/webp"], maxSize: 5 * 1024 * 1024 },
  blogs: { accept: ["image/jpeg", "image/png", "image/webp"], maxSize: 5 * 1024 * 1024 },
  certificates: { accept: ["image/jpeg", "image/png", "image/webp"], maxSize: 5 * 1024 * 1024 },
  resume: { accept: ["application/pdf"], maxSize: 10 * 1024 * 1024 },
};

export function validateUploadFile(folder, file) {
  const constraint = UPLOAD_CONSTRAINTS[folder];
  if (!constraint) return { valid: false, error: "Unknown folder" };
  if (!constraint.accept.includes(file.type)) {
    return {
      valid: false,
      error: `Unsupported file type. Allowed: ${constraint.accept
        .map((t) => t.split("/")[1])
        .join(", ")}`,
    };
  }
  if (file.size > constraint.maxSize) {
    const mb = (constraint.maxSize / (1024 * 1024)).toFixed(0);
    return { valid: false, error: `File too large. Maximum size is ${mb} MB.` };
  }
  return { valid: true };
}
