/**
 * Safe localStorage utilities with iOS Safari compatibility
 * iOS Safari in private mode throws errors when accessing localStorage
 */

const memoryStorage = new Map();

function isLocalStorageAvailable() {
  try {
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

const storageAvailable = typeof window !== 'undefined' && isLocalStorageAvailable();

export function getItem(key, defaultValue = null) {
  try {
    if (storageAvailable) {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    }
    return memoryStorage.get(key) ?? defaultValue;
  } catch (e) {
    console.warn(`Error reading from storage for key "${key}":`, e);
    return defaultValue;
  }
}

export function setItem(key, value) {
  try {
    if (storageAvailable) {
      window.localStorage.setItem(key, JSON.stringify(value));
    } else {
      memoryStorage.set(key, value);
    }
  } catch (e) {
    console.warn(`Error writing to storage for key "${key}":`, e);
    // Fallback to memory storage if quota exceeded
    memoryStorage.set(key, value);
  }
}

export function removeItem(key) {
  try {
    if (storageAvailable) {
      window.localStorage.removeItem(key);
    } else {
      memoryStorage.delete(key);
    }
  } catch (e) {
    console.warn(`Error removing from storage for key "${key}":`, e);
    memoryStorage.delete(key);
  }
}
