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

export const skillsApi = {
  list: (params = {}) => api.get(`${endpoints.skills.list}${qs(params)}`),
  byCategory: (category, params = {}) =>
    api.get(`${endpoints.skills.byCategory(category)}${qs(params)}`),
  byId: (id) => api.get(endpoints.skills.byId(id)),
  create: (payload) => api.post(endpoints.skills.create, payload),
  update: (id, payload) => api.patch(endpoints.skills.update(id), payload),
  remove: (id) => api.del(endpoints.skills.delete(id)),
};

export default skillsApi;
