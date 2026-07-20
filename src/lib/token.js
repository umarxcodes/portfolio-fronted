// Token storage keys (localStorage only — backend issues a single JWT, no
// httpOnly cookie or refresh endpoint, so the access token must live client-side).
export const STORAGE_KEYS = {
  token: "portfolio.cms.token",
  admin: "portfolio.cms.admin",
  theme: "portfolio.cms.theme",
};

export const tokenStorage = {
  get() {
    try {
      return localStorage.getItem(STORAGE_KEYS.token);
    } catch {
      return null;
    }
  },
  set(value) {
    try {
      localStorage.setItem(STORAGE_KEYS.token, value);
    } catch {
      /* ignore quota / privacy errors */
    }
  },
  clear() {
    try {
      localStorage.removeItem(STORAGE_KEYS.token);
      localStorage.removeItem(STORAGE_KEYS.admin);
    } catch {
      /* ignore */
    }
  },
};

export default tokenStorage;
