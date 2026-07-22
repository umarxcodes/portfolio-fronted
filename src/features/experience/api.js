import api from "@/api/client";
import { endpoints } from "@/api/endpoints";

import { buildQueryString } from "@/lib/queryString";

export const experienceApi = {
  list: (params = {}) => api.get(`${endpoints.experience.list}${buildQueryString(params)}`),
  byId: (id) => api.get(endpoints.experience.byId(id)),
  create: (payload) => api.post(endpoints.experience.create, payload),
  update: (id, payload) => api.patch(endpoints.experience.update(id), payload),
  remove: (id) => api.del(endpoints.experience.delete(id)),
};
