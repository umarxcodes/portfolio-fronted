import api from "@/api/client";
import { endpoints } from "@/api/endpoints";

export const settingsApi = {
  get: () => api.get(endpoints.settings.get),
  update: (payload) => api.patch(endpoints.settings.update, payload),
};
