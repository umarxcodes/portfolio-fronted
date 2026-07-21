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

export const contactApi = {
  submit: (payload) => api.post(endpoints.contact.submit, payload),
  list: (params = {}) => api.get(`${endpoints.contact.list}${qs(params)}`),
  byId: (id) => api.get(endpoints.contact.byId(id)),
  updateStatus: (id, status) => api.patch(endpoints.contact.updateStatus(id), { status }),
  remove: (id) => api.del(endpoints.contact.delete(id)),
};

export default contactApi;
