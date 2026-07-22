import api from "@/api/client";
import { endpoints } from "@/api/endpoints";

import { buildQueryString } from "@/lib/queryString";

export const certificatesApi = {
  list: (params = {}) => api.get(`${endpoints.certificates.list}${buildQueryString(params)}`),
  byId: (id) => api.get(endpoints.certificates.byId(id)),
  create: (payload) => api.post(endpoints.certificates.create, payload),
  update: (id, payload) => api.patch(endpoints.certificates.update(id), payload),
  remove: (id) => api.del(endpoints.certificates.delete(id)),
};
