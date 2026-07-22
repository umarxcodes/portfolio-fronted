import api from "@/api/client";
import { endpoints } from "@/api/endpoints";

import { buildQueryString } from "@/lib/queryString";

export const contactApi = {
  submit: (payload) => api.post(endpoints.contact.submit, payload),
  list: (params = {}) => api.get(`${endpoints.contact.list}${buildQueryString(params)}`),
  byId: (id) => api.get(endpoints.contact.byId(id)),
  updateStatus: (id, status) => api.patch(endpoints.contact.updateStatus(id), { status }),
  remove: (id) => api.del(endpoints.contact.delete(id)),
};
