/**
 * API error model mirroring the backend error envelope:
 * { success: false, message: string, errors: Array<{ field, message }> }
 */
export class ApiError extends Error {
  constructor({ status, message, errors = [], data = null }) {
    super(message || "Something went wrong");
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
    this.data = data;
  }

  get fieldErrors() {
    const map = {};
    for (const err of this.errors || []) {
      if (err && err.field) {
        map[err.field] = err.message;
      }
    }
    return map;
  }

  get isAuth() {
    return this.status === 401 || this.status === 403;
  }

  get isValidation() {
    return this.status === 400 || this.status === 422;
  }

  get isRateLimited() {
    return this.status === 429;
  }

  get isNotFound() {
    return this.status === 404;
  }
}

export function normalizeError(error) {
  if (error instanceof ApiError) return error;

  if (error && typeof error === "object" && "isAxiosError" in error) {
    const resp = error.response;
    const body = resp?.data || {};
    return new ApiError({
      status: resp?.status || 0,
      message: body.message || error.message || "Network error",
      errors: body.errors || [],
      data: body.data || null,
    });
  }

  return new ApiError({
    status: 0,
    message: error?.message || "Unexpected error",
    errors: [],
  });
}

export function getErrorMessage(error) {
  const normalized = normalizeError(error);
  if (normalized.errors?.length) {
    return normalized.errors.map((e) => e.message).join(", ");
  }
  if (normalized.isRateLimited) {
    return "Too many requests. Please wait a moment and try again.";
  }
  return normalized.message || "Something went wrong";
}

export default ApiError;
