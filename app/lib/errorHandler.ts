import { ApiError, type ApiErrorCode } from "~/api/error"

const USER_ERROR_MESSAGES: Record<ApiErrorCode, string> = {
  UNAUTHORIZED: 'Your session has expired. Please sign in again.',
  FORBIDDEN: 'You don\'t have permission to do that.',
  NOT_FOUND: 'The requested resource could not be found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  CONFLICT: 'This action conflicts with existing data.',
  RATE_LIMITED: 'Too many requests. Please wait a moment.',
  SERVER_ERROR: 'Something went wrong on our end. Please try again later.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  TIMEOUT: 'The request timed out. Please try again.',
  UNKNOWN: 'An unexpected error occurred.',
}

export const handleUserError = (err: unknown) => {
  if (err instanceof ApiError) {
    return {
      message: USER_ERROR_MESSAGES[err.code],
      code: err.code
    }
  }
  else {
    return {
      message: USER_ERROR_MESSAGES.UNKNOWN,
      code: "UNKNOWN" as ApiErrorCode
    }
  }
}

const OAUTH_ERROR_MESSAGES: Record<string, string> = {
  access_denied: 'You denied the authorization request. Please try signing in again.',
  temporarily_unavailable: 'X authentication is temporarily unavailable. Please try again later.',
};

export function describeOAuthError(error: string, description?: string): string {
  if (description) return description;
  return OAUTH_ERROR_MESSAGES[error] ?? 'Something went wrong during sign-in. Please try again.';
}


