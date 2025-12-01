import type { YelpBusiness } from "./types";

interface CachedData {
  results: YelpBusiness[];
  timestamp: number;
  airportCode: string;
}

// Cache TTL in milliseconds (24 hours - Yelp API Terms limit)
const CACHE_TTL = 24 * 60 * 60 * 1000;

const CACHE_KEY_PREFIX = "airportly_cache_";

function getCacheKey(airportCode: string): string {
  return `${CACHE_KEY_PREFIX}${airportCode.toUpperCase()}`;
}

export function getCachedResults(airportCode: string): YelpBusiness[] | null {
  if (typeof window === "undefined") return null;

  try {
    const key = getCacheKey(airportCode);
    const cached = localStorage.getItem(key);

    if (!cached) return null;

    const data: CachedData = JSON.parse(cached);
    const now = Date.now();

    // Check if cache is expired
    if (now - data.timestamp > CACHE_TTL) {
      localStorage.removeItem(key);
      return null;
    }

    return data.results;
  } catch {
    return null;
  }
}

export function setCachedResults(airportCode: string, results: YelpBusiness[]): void {
  if (typeof window === "undefined") return;

  try {
    const key = getCacheKey(airportCode);
    const data: CachedData = {
      results,
      timestamp: Date.now(),
      airportCode: airportCode.toUpperCase(),
    };

    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // localStorage might be full or disabled
    console.warn("Failed to cache results");
  }
}

export function getCacheAge(airportCode: string): number | null {
  if (typeof window === "undefined") return null;

  try {
    const key = getCacheKey(airportCode);
    const cached = localStorage.getItem(key);

    if (!cached) return null;

    const data: CachedData = JSON.parse(cached);
    return Date.now() - data.timestamp;
  } catch {
    return null;
  }
}

export function formatCacheAge(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  if (minutes < 1) return "just now";
  if (minutes === 1) return "1 minute ago";
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  if (hours === 1) return "1 hour ago";
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

export function clearCache(airportCode?: string): void {
  if (typeof window === "undefined") return;

  if (airportCode) {
    localStorage.removeItem(getCacheKey(airportCode));
  } else {
    // Clear all airportly cache entries
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(CACHE_KEY_PREFIX)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key));
  }
}

export function isCacheValid(airportCode: string): boolean {
  const age = getCacheAge(airportCode);
  return age !== null && age < CACHE_TTL;
}
