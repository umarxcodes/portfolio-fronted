import api from "@/api/client";
import { endpoints } from "@/api/endpoints";

export const projectsApi = {
  list: (params = {}) => api.get(`${endpoints.projects.list}${qs(params)}`),
  featured: (params = {}) => api.get(`${endpoints.projects.featured}${qs(params)}`),
  byCategory: (category, params = {}) =>
    api.get(`${endpoints.projects.byCategory(category)}${qs(params)}`),
  bySlug: (slug) => api.get(endpoints.projects.bySlug(slug)),
  byId: (id) => api.get(endpoints.projects.byId(id)),
  create: (payload) => api.post(endpoints.projects.create, payload),
  update: (id, payload) => api.patch(endpoints.projects.update(id), payload),
  remove: (id) => api.del(endpoints.projects.delete(id)),
};

function qs(params) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    search.append(key, String(value));
  });
  const s = search.toString();
  return s ? `?${s}` : "";
}

export default projectsApi;
