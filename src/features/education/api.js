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

export const educationApi = {
  list: (params = {}) => api.get(`${endpoints.education.list}${qs(params)}`),
  current: () => api.get(endpoints.education.current),
  byId: (id) => api.get(endpoints.education.byId(id)),
  create: (payload) => api.post(endpoints.education.create, payload),
  update: (id, payload) => api.patch(endpoints.education.update(id), payload),
  remove: (id) => api.del(endpoints.education.delete(id)),
};

export default educationApi;
