import { useState, useEffect } from 'react';

/**
 * Custom hook to sync state with localStorage
 * @param key - localStorage key
 * @param initialValue - Default value if nothing in storage
 * @returns Tuple of [value, setValue] like useState
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
    // Get initial value from localStorage or use default
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error loading ${key} from localStorage:`, error);
            return initialValue;
        }
    });

    // Update localStorage when value changes
    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error(`Error saving ${key} to localStorage:`, error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue] as const;
}
