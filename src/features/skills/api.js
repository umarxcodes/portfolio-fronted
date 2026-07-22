import api from "@/api/client";
import { endpoints } from "@/api/endpoints";

import { buildQueryString } from "@/lib/queryString";

export const skillsApi = {
  list: (params = {}) => api.get(`${endpoints.skills.list}${buildQueryString(params)}`),
  byCategory: (category, params = {}) =>
    api.get(`${endpoints.skills.byCategory(category)}${buildQueryString(params)}`),
  byId: (id) => api.get(endpoints.skills.byId(id)),
  create: (payload) => api.post(endpoints.skills.create, payload),
  update: (id, payload) => api.patch(endpoints.skills.update(id), payload),
  remove: (id) => api.del(endpoints.skills.delete(id)),
};
