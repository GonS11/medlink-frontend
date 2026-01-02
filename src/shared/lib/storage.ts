import {safeJsonParse} from './format.ts'

/**
 * Storage helpers
 */
export const storage = {
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key)
      if (!item) {
        return null
      }
      const parsed = safeJsonParse<T>(item, null as T)
      return parsed !== null ? parsed : (item as T)
    } catch {
      return null
    }
  },

  set<T>(key: string, value: T): void {
    try {
      if (typeof value === 'string') {
        localStorage.setItem(key, value)
      } else {
        localStorage.setItem(key, JSON.stringify(value))
      }
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('Error removing from localStorage:', error)
    }
  },

  clear(): void {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('Error clearing localStorage:', error)
    }
  },
}
