import api from "@/api/client";
import { endpoints } from "@/api/endpoints";

function qs(params) {
  const search = new URLSearchParams();
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    search.append(key, String(value));
  });
  const s = search.toString();
  return s ? `?${s}` : "";
}

export const blogsApi = {
  list: (params = {}) => api.get(`${endpoints.blogs.list}${qs(params)}`),
  featured: (params = {}) => api.get(`${endpoints.blogs.featured}${qs(params)}`),
  byCategory: (category, params = {}) =>
    api.get(`${endpoints.blogs.byCategory(category)}${qs(params)}`),
  byTag: (tag, params = {}) => api.get(`${endpoints.blogs.byTag(tag)}${qs(params)}`),
  bySlug: (slug) => api.get(endpoints.blogs.bySlug(slug)),
  byId: (id) => api.get(endpoints.blogs.byId(id)),
  create: (payload) => api.post(endpoints.blogs.create, payload),
  update: (id, payload) => api.patch(endpoints.blogs.update(id), payload),
  remove: (id) => api.del(endpoints.blogs.delete(id)),
};

export default blogsApi;
