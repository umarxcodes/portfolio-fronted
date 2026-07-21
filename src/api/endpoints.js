// Centralized endpoint paths. Mirrors the backend route map exactly.
export const endpoints = {
  auth: {
    login: "/auth/login",
    profile: "/auth/profile",
    logout: "/auth/logout",
    changePassword: "/auth/change-password",
  },
  profile: {
    get: "/profile",
    update: "/profile",
  },
  projects: {
    list: "/projects",
    featured: "/projects/featured",
    byCategory: (category) => `/projects/category/${category}`,
    bySlug: (slug) => `/projects/slug/${slug}`,
    byId: (id) => `/projects/${id}`,
    create: "/projects",
    update: (id) => `/projects/${id}`,
    delete: (id) => `/projects/${id}`,
  },
  skills: {
    list: "/skills",
    byCategory: (category) => `/skills/category/${category}`,
    byId: (id) => `/skills/${id}`,
    create: "/skills",
    update: (id) => `/skills/${id}`,
    delete: (id) => `/skills/${id}`,
  },
  experience: {
    list: "/experience",
    byId: (id) => `/experience/${id}`,
    create: "/experience",
    update: (id) => `/experience/${id}`,
    delete: (id) => `/experience/${id}`,
  },
  education: {
    list: "/education",
    current: "/education/current",
    byId: (id) => `/education/${id}`,
    create: "/education",
    update: (id) => `/education/${id}`,
    delete: (id) => `/education/${id}`,
  },
  certificates: {
    list: "/certificates",
    byId: (id) => `/certificates/${id}`,
    create: "/certificates",
    update: (id) => `/certificates/${id}`,
    delete: (id) => `/certificates/${id}`,
  },
  blogs: {
    list: "/blogs",
    featured: "/blogs/featured",
    byCategory: (category) => `/blogs/category/${category}`,
    byTag: (tag) => `/blogs/tag/${tag}`,
    bySlug: (slug) => `/blogs/slug/${slug}`,
    byId: (id) => `/blogs/${id}`,
    create: "/blogs",
    update: (id) => `/blogs/${id}`,
    delete: (id) => `/blogs/${id}`,
  },
  contact: {
    submit: "/contact",
    list: "/contact",
    byId: (id) => `/contact/${id}`,
    updateStatus: (id) => `/contact/${id}`,
    delete: (id) => `/contact/${id}`,
  },
  uploads: {
    create: "/uploads",
    byId: (id) => `/uploads/${id}`,
    delete: (id) => `/uploads/${id}`,
  },
  analytics: {
    track: "/analytics/track",
    overview: "/analytics/overview",
    monthly: "/analytics/monthly",
    projects: "/analytics/projects",
    blogs: "/analytics/blogs",
    contact: "/analytics/contact",
  },
  settings: {
    get: "/settings",
    update: "/settings",
  },
  search: {
    query: "/search",
  },
};

export default endpoints;
