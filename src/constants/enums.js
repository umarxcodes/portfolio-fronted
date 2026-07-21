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

export const STATUS_META = {
  "in-progress": { label: "In Progress", tone: "info" },
  completed: { label: "Completed", tone: "success" },
  planned: { label: "Planned", tone: "warning" },
  archived: { label: "Archived", tone: "neutral" },
  unread: { label: "Unread", tone: "danger" },
  read: { label: "Read", tone: "info" },
  replied: { label: "Replied", tone: "success" },
};

export const SKILL_LEVEL_META = {
  beginner: { label: "Beginner", percent: 25 },
  intermediate: { label: "Intermediate", percent: 50 },
  advanced: { label: "Advanced", percent: 75 },
  expert: { label: "Expert", percent: 100 },
};

export default {
  PROJECT_CATEGORIES,
  PROJECT_STATUSES,
  SKILL_CATEGORIES,
  SKILL_LEVELS,
  EMPLOYMENT_TYPES,
  CONTACT_STATUSES,
  UPLOAD_FOLDERS,
  SETTINGS_THEMES,
  SEARCH_TYPES,
  STATUS_META,
  SKILL_LEVEL_META,
};
