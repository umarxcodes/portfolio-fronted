import api from "@/api/client";
import { endpoints } from "@/api/endpoints";

export const analyticsApi = {
  track: (payload) => api.post(endpoints.analytics.track, payload),
  overview: () => api.get(endpoints.analytics.overview),
  monthly: (months = 6) => api.get(`${endpoints.analytics.monthly}?months=${months}`),
  projects: () => api.get(endpoints.analytics.projects),
  blogs: () => api.get(endpoints.analytics.blogs),
  contact: () => api.get(endpoints.analytics.contact),
};

export default analyticsApi;
