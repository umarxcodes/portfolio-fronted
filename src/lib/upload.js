import { uploadFile } from "@/api/client";
import { endpoints } from "@/api/endpoints";

/**
 * Upload helper. `folder` must be one of the backend enum values; `file` is a
 * browser File. Returns the upload record `{ upload }` from the backend.
 */
export async function uploadAsset({ folder, file, onProgress }) {
  const formData = new FormData();
  formData.append("folder", folder);
  formData.append("file", file);
  const data = await uploadFile(endpoints.uploads.create, formData, { onProgress });
  return data?.upload ?? data;
}

export default uploadAsset;
