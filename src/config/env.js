const API_ROOT =
  import.meta.env.VITE_API_BASE_URL || "https://portfolio-server-ten-ecru.vercel.app";

function resolveApiBaseUrl(baseUrl) {
  const normalized = baseUrl.replace(/\/+$/, "");
  return normalized.endsWith("/api/v1") ? normalized : `${normalized}/api/v1`;
}

export const env = {
  apiBaseUrl: resolveApiBaseUrl(API_ROOT),
  backendBaseUrl: API_ROOT.replace(/\/+$/, ""),
  appTitle: import.meta.env.VITE_APP_TITLE || "Muhammad Umar",
  appVersion: import.meta.env.VITE_APP_VERSION || "1.0.0",
  isDev: import.meta.env.DEV,
};

export default env;
