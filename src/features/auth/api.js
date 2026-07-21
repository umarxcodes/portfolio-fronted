import api from "@/api/client";
import { endpoints } from "@/api/endpoints";

export const authApi = {
  login: (payload) => api.post(endpoints.auth.login, payload),
  profile: () => api.get(endpoints.auth.profile),
  logout: () => api.post(endpoints.auth.logout, {}),
  changePassword: (payload) => api.patch(endpoints.auth.changePassword, payload),
};

export default authApi;
