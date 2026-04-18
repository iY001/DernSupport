/**
 * HTTP Error Handler Utility
 * Handles different HTTP error scenarios
 */

export const handleApiError = (error) => {
  if (!error.response) {
    // Network error
    return {
      message: 'Network error. Please check your connection.',
      type: 'network',
    };
  }

  const { status, data } = error.response;

  switch (status) {
    case 400:
      return {
        message: data.message || 'Bad request. Please check your input.',
        type: 'validation',
      };
    case 401:
      return {
        message: 'Unauthorized. Please log in again.',
        type: 'auth',
      };
    case 403:
      return {
        message: 'Forbidden. You do not have permission.',
        type: 'permission',
      };
    case 404:
      return {
        message: 'Resource not found.',
        type: 'notfound',
      };
    case 429:
      return {
        message: 'Too many requests. Please try again later.',
        type: 'ratelimit',
      };
    case 500:
      return {
        message: 'Server error. Please try again later.',
        type: 'server',
      };
    default:
      return {
        message: data.message || 'An unexpected error occurred.',
        type: 'unknown',
      };
  }
};

export const isAxiosError = (error) => error && error.response;
