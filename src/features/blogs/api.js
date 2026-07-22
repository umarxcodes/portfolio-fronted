import api from "@/api/client";
import { endpoints } from "@/api/endpoints";

import { buildQueryString } from "@/lib/queryString";

export const blogsApi = {
  list: (params = {}) => api.get(`${endpoints.blogs.list}${buildQueryString(params)}`),
  featured: (params = {}) => api.get(`${endpoints.blogs.featured}${buildQueryString(params)}`),
  byCategory: (category, params = {}) =>
    api.get(`${endpoints.blogs.byCategory(category)}${buildQueryString(params)}`),
  byTag: (tag, params = {}) => api.get(`${endpoints.blogs.byTag(tag)}${buildQueryString(params)}`),
  bySlug: (slug) => api.get(endpoints.blogs.bySlug(slug)),
  byId: (id) => api.get(endpoints.blogs.byId(id)),
  create: (payload) => api.post(endpoints.blogs.create, payload),
  update: (id, payload) => api.patch(endpoints.blogs.update(id), payload),
  remove: (id) => api.del(endpoints.blogs.delete(id)),
};
