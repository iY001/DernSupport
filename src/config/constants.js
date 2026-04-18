/**
 * Frontend Constants
 * Centralized configuration and constants for the application
 */

export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
export const APP_NAME = process.env.REACT_APP_NAME || 'DernSupport';
export const APP_VERSION = process.env.REACT_APP_VERSION || '1.0.0';

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    SIGN_IN: '/user/signin',
    SIGN_UP: '/user/signup',
    FORGOT_PASSWORD: '/user/forgotPassword',
    RESET_PASSWORD: '/user/resetPassword',
    CHECK_TOKEN: '/user/checkToken',
  },

  // Users
  USERS: {
    GET_ALL: '/user/getAllUsers',
    GET_BY_ID: '/user/:id',
    UPDATE: '/user/:id',
    DELETE: '/user/:id',
    GET_PROFILE: '/user/getProfile',
    UPDATE_PROFILE: '/user/updateProfile',
  },

  // Tickets
  TICKETS: {
    GET_ALL: '/tickets/getAllTickets',
    GET_BY_ID: '/tickets/:id',
    CREATE: '/tickets/postTicket',
    UPDATE: '/tickets/:id',
    DELETE: '/tickets/:id',
    SOLVE: '/tickets/solveTicket/:id',
  },

  // Problems
  PROBLEMS: {
    GET_ALL: '/problems/getAllProblems',
    GET_BY_ID: '/problems/:id',
    CREATE: '/problems/postProblem',
    DELETE: '/problems/:id',
    SEND_SOLUTION: '/problems/sendSolution/:id',
  },

  // Replies
  REPLIES: {
    GET_ALL: '/replies/getAllReplies',
    GET_BY_TICKET: '/replies/getByTicketId/:id',
    CREATE: '/replies/postReply',
    UPDATE: '/replies/:id',
    DELETE: '/replies/:id',
  },

  // Images
  IMAGES: {
    UPLOAD: '/images/addImage',
    GET: '/images/getImage/:id',
  },

  // AI Chat
  AI: {
    CHAT: '/aichat/chat',
  },
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

// Messages
export const MESSAGES = {
  SUCCESS: {
    LOGIN: 'Login successful!',
    SIGNUP: 'Account created successfully!',
    UPDATE: 'Updated successfully!',
    DELETE: 'Deleted successfully!',
    CREATE: 'Created successfully!',
  },
  ERROR: {
    NETWORK: 'Network error. Please try again.',
    UNAUTHORIZED: 'Please login to continue.',
    FORBIDDEN: 'You do not have permission to access this.',
    NOT_FOUND: 'Resource not found.',
    SERVER_ERROR: 'Server error. Please try again later.',
    INVALID_INPUT: 'Please fill in all required fields.',
  },
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
  IS_AUTHENTICATED: 'isAuthenticated',
};

// Regex Patterns
export const PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  PHONE: /^[\d\s\-\+\(\)]{10,}$/,
  URL: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
};

// Time Delays (in ms)
export const DELAYS = {
  DEBOUNCE: 300,
  TOAST_DURATION: 3000,
  SHORT_ANIMATION: 300,
};

// Theme
export const THEME = {
  PRIMARY: '#FF6B6B',
  SECONDARY: '#4ECDC4',
  SUCCESS: '#95E1D3',
  WARNING: '#FFB26B',
  ERROR: '#FF6B6B',
  DARK: '#2D3436',
  LIGHT: '#F8F9FA',
};
