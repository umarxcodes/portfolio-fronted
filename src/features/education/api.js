import api from "@/api/client";
import { endpoints } from "@/api/endpoints";

import { buildQueryString } from "@/lib/queryString";

export const educationApi = {
  list: (params = {}) => api.get(`${endpoints.education.list}${buildQueryString(params)}`),
  current: () => api.get(endpoints.education.current),
  byId: (id) => api.get(endpoints.education.byId(id)),
  create: (payload) => api.post(endpoints.education.create, payload),
  update: (id, payload) => api.patch(endpoints.education.update(id), payload),
  remove: (id) => api.del(endpoints.education.delete(id)),
};
