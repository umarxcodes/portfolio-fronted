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

export const experienceApi = {
  list: (params = {}) => api.get(`${endpoints.experience.list}${qs(params)}`),
  byId: (id) => api.get(endpoints.experience.byId(id)),
  create: (payload) => api.post(endpoints.experience.create, payload),
  update: (id, payload) => api.patch(endpoints.experience.update(id), payload),
  remove: (id) => api.del(endpoints.experience.delete(id)),
};

export default experienceApi;
