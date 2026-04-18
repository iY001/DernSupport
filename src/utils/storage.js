/**
 * Storage Utility
 * Safe wrapper for localStorage and sessionStorage
 */

import { STORAGE_KEYS } from '../config/constants';

export const storage = {
  // Get item
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from storage:', error);
      return null;
    }
  },

  // Set item
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to storage:', error);
    }
  },

  // Remove item
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from storage:', error);
    }
  },

  // Clear all
  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },

  // Get user from storage
  getUser: () => storage.get(STORAGE_KEYS.USER),

  // Set user in storage
  setUser: (user) => storage.set(STORAGE_KEYS.USER, user),

  // Remove user from storage
  removeUser: () => storage.remove(STORAGE_KEYS.USER),

  // Get token from storage
  getToken: () => storage.get(STORAGE_KEYS.TOKEN),

  // Set token in storage
  setToken: (token) => storage.set(STORAGE_KEYS.TOKEN, token),

  // Remove token from storage
  removeToken: () => storage.remove(STORAGE_KEYS.TOKEN),
};

export default storage;
