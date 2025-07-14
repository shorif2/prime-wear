import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const API_BASE_URL = import.meta.env.PUBLIC_API_URL || "/api/v1";

console.log(API_BASE_URL);
export function createApiUrl(path: string): string {
  return `${API_BASE_URL}${path}`;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Production-safe logging utility
interface LogContext {
  component?: string;
  action?: string;
  [key: string]: any; // Allow flexible metadata properties
}

const isDevelopment =
  import.meta.env.DEV || import.meta.env.NODE_ENV === "development";
const isLoggingEnabled =
  isDevelopment || import.meta.env.PUBLIC_ENABLE_LOGGING === "true";

export const logger = {
  debug: (message: string, context?: LogContext) => {
    if (isDevelopment) {
      console.debug(`[DEBUG] ${message}`, context || "");
    }
  },

  info: (message: string, context?: LogContext) => {
    if (isLoggingEnabled) {
      console.info(`[INFO] ${message}`, context || "");
    }
  },

  warn: (message: string, context?: LogContext) => {
    if (isLoggingEnabled) {
      console.warn(`[WARN] ${message}`, context || "");
    }
  },

  error: (message: string, error?: Error | unknown, context?: LogContext) => {
    // Always log errors, even in production
    console.error(`[ERROR] ${message}`, {
      error:
        error instanceof Error
          ? {
              name: error.name,
              message: error.message,
              stack: isDevelopment ? error.stack : undefined,
            }
          : error,
      context: context || {},
    });
  },

  // For tracking user actions and business metrics
  track: (event: string, properties?: Record<string, any>) => {
    if (isDevelopment) {
      console.info(`[TRACK] ${event}`, properties || {});
    }
    // In production, this could send to analytics service
  },
};

/**
 * Converts a Unix timestamp (in seconds) to a JavaScript Date object
 * Handles both number and string inputs, and passes through Date objects
 */
export function unixToDate(
  timestamp: number | string | Date | null | undefined,
): Date | null {
  if (timestamp === null || timestamp === undefined) return null;

  // If already a Date object, return it
  if (timestamp instanceof Date) return timestamp;

  const numTimestamp =
    typeof timestamp === "string" ? parseInt(timestamp, 10) : timestamp;

  // Check if the timestamp is in seconds (Unix timestamp) or milliseconds (JS timestamp)
  // Unix timestamps are typically 10 digits, JS timestamps are 13 digits
  const multiplier = numTimestamp < 10000000000 ? 1000 : 1;

  try {
    const date = new Date(numTimestamp * multiplier);
    return isNaN(date.getTime()) ? null : date;
  } catch (error) {
    logger.error("Error converting timestamp to date", error, { timestamp });
    return null;
  }
}

/**
 * Formats a date for display
 * Handles null dates and invalid dates
 */
export function formatDate(
  date: Date | number | string | null | undefined,
): string {
  if (date === null || date === undefined) return "N/A";

  // If date is a timestamp (number or string), convert it to a Date object
  if (typeof date === "number" || typeof date === "string") {
    date = unixToDate(date);
  }

  // Check if date is valid
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return "Invalid date";
  }

  try {
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch (error) {
    logger.error("Error formatting date", error, { date });
    return "Invalid date";
  }
}
