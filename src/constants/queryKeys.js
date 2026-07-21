// TanStack Query keys. Centralized so invalidation is consistent.
export const queryKeys = {
  settings: ["settings"],
  profile: ["profile"],
  projects: {
    all: ["projects"],
    list: (params) => ["projects", "list", params],
    featured: (params) => ["projects", "featured", params],
    category: (category, params) => ["projects", "category", category, params],
    slug: (slug) => ["projects", "slug", slug],
    detail: (id) => ["projects", "detail", id],
  },
  skills: {
    all: ["skills"],
    list: (params) => ["skills", "list", params],
    category: (category, params) => ["skills", "category", category, params],
    detail: (id) => ["skills", "detail", id],
  },
  experience: {
    all: ["experience"],
    list: (params) => ["experience", "list", params],
    current: ["experience", "current"],
    detail: (id) => ["experience", "detail", id],
  },
  education: {
    all: ["education"],
    list: (params) => ["education", "list", params],
    current: ["education", "current"],
    detail: (id) => ["education", "detail", id],
  },
  certificates: {
    all: ["certificates"],
    list: (params) => ["certificates", "list", params],
    detail: (id) => ["certificates", "detail", id],
  },
  blogs: {
    all: ["blogs"],
    list: (params) => ["blogs", "list", params],
    featured: (params) => ["blogs", "featured", params],
    category: (category, params) => ["blogs", "category", category, params],
    tag: (tag, params) => ["blogs", "tag", tag, params],
    slug: (slug) => ["blogs", "slug", slug],
    detail: (id) => ["blogs", "detail", id],
  },
  contact: {
    all: ["contact"],
    list: (params) => ["contact", "list", params],
    detail: (id) => ["contact", "detail", id],
    unreadCount: ["contact", "unread-count"],
  },
  uploads: {
    all: ["uploads"],
    detail: (id) => ["uploads", "detail", id],
  },
  analytics: {
    overview: ["analytics", "overview"],
    monthly: (months) => ["analytics", "monthly", months],
    projects: ["analytics", "projects"],
    blogs: ["analytics", "blogs"],
    contact: ["analytics", "contact"],
  },
  search: (params) => ["search", params],
  auth: {
    profile: ["auth", "profile"],
  },
};

export default queryKeys;
