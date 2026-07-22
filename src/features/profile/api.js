import api from "@/api/client";
import { endpoints } from "@/api/endpoints";

export const profileApi = {
  get: () => api.get(endpoints.profile.get),
  update: (payload) => api.patch(endpoints.profile.update, payload),
};
