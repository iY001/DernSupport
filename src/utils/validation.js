/**
 * Form Validation Utilities
 * Helper functions for validating form inputs
 */

import { PATTERNS } from '../config/constants';

export const validateEmail = (email) => {
  if (!email) return 'Email is required';
  if (!PATTERNS.EMAIL.test(email)) return 'Please enter a valid email';
  return null;
};

export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return null;
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return 'Please confirm your password';
  if (password !== confirmPassword) return 'Passwords do not match';
  return null;
};

export const validateName = (name) => {
  if (!name) return 'Name is required';
  if (name.trim().length < 2) return 'Name must be at least 2 characters';
  return null;
};

export const validatePhone = (phone) => {
  if (!phone) return 'Phone number is required';
  if (!PATTERNS.PHONE.test(phone)) return 'Please enter a valid phone number';
  return null;
};

export const validateUrl = (url) => {
  if (!url) return 'URL is required';
  if (!PATTERNS.URL.test(url)) return 'Please enter a valid URL';
  return null;
};

export const validateRequired = (value, fieldName) => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return `${fieldName} is required`;
  }
  return null;
};
