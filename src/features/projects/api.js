import api from "@/api/client";
import { endpoints } from "@/api/endpoints";

import { buildQueryString } from "@/lib/queryString";

export const projectsApi = {
  list: (params = {}) => api.get(`${endpoints.projects.list}${buildQueryString(params)}`),
  featured: (params = {}) => api.get(`${endpoints.projects.featured}${buildQueryString(params)}`),
  byCategory: (category, params = {}) =>
    api.get(`${endpoints.projects.byCategory(category)}${buildQueryString(params)}`),
  bySlug: (slug) => api.get(endpoints.projects.bySlug(slug)),
  byId: (id) => api.get(endpoints.projects.byId(id)),
  create: (payload) => api.post(endpoints.projects.create, payload),
  update: (id, payload) => api.patch(endpoints.projects.update(id), payload),
  remove: (id) => api.del(endpoints.projects.delete(id)),
};
