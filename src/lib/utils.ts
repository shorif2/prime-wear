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
