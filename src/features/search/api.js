import api from "@/api/client";
import { endpoints } from "@/api/endpoints";

import { buildQueryString } from "@/lib/queryString";

export const searchApi = {
  query: (params) => api.get(`${endpoints.search.query}${buildQueryString(params)}`),
};
