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

export const certificatesApi = {
  list: (params = {}) => api.get(`${endpoints.certificates.list}${qs(params)}`),
  byId: (id) => api.get(endpoints.certificates.byId(id)),
  create: (payload) => api.post(endpoints.certificates.create, payload),
  update: (id, payload) => api.patch(endpoints.certificates.update(id), payload),
  remove: (id) => api.del(endpoints.certificates.delete(id)),
};

export default certificatesApi;
