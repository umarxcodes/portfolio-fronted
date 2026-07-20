import axiosInstance from "./axios";

/**
 * Low-level request helpers. Every helper returns the unwrapped `data` field
 * from the backend success envelope, matching the contract.
 */
export async function get(url, config = {}) {
  const res = await axiosInstance.get(url, config);
  return res.data?.data ?? null;
}

export async function post(url, body, config = {}) {
  const res = await axiosInstance.post(url, body, config);
  return res.data?.data ?? null;
}

export async function patch(url, body, config = {}) {
  const res = await axiosInstance.patch(url, body, config);
  return res.data?.data ?? null;
}

export async function del(url, config = {}) {
  const res = await axiosInstance.delete(url, config);
  return res.data?.data ?? null;
}

/**
 * Multipart upload with progress. `onProgress` receives 0–100.
 */
export async function uploadFile(url, formData, { onProgress } = {}) {
  const res = await axiosInstance.post(url, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (event) => {
      if (!onProgress || !event.total) return;
      const percent = Math.round((event.loaded / event.total) * 100);
      onProgress(percent);
    },
  });
  return res.data?.data ?? null;
}

export default { get, post, patch, del, uploadFile };
