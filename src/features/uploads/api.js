import api from "@/api/client";
import { endpoints } from "@/api/endpoints";
import { uploadAsset } from "@/lib/upload";

export const uploadsApi = {
  create: (folder, file, onProgress) => uploadAsset({ folder, file, onProgress }),
  byId: (id) => api.get(endpoints.uploads.byId(id)),
  remove: (id) => api.del(endpoints.uploads.delete(id)),
};
