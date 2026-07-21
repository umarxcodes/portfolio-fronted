import { QueryClient } from "@tanstack/react-query";

// Retry only transient failures (network / 5xx). Never retry:
// 4xx, 401, 403, 404, 409, 422, 429 (matches backend security posture).
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        const status = error?.status;
        if (!status) return failureCount < 2; // network errors
        if (status >= 500) return failureCount < 2;
        return false;
      },
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8000),
    },
    mutations: {
      retry: false,
    },
  },
});

export default queryClient;
