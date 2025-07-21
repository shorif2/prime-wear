// src/lib/api/categories.ts

import type { Category } from "../interface";
import { createApiUrl } from "../utils";
import { fetchWithRetry } from "./authentication";

/**
 * Fetches a list of all categories.
 * @returns A promise resolving to an array of Category objects or null on failure.
 */
export async function getAllCategories(): Promise<Category[] | null> {
  try {
    const url = createApiUrl("/categories");
    const response = await fetchWithRetry(url);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: { categories: Category[] } = await response.json();
    return data.categories;
  } catch (error) {
    console.error("Error fetching all categories:", error);
    return null;
  }
}

/**
 * Fetches a single category by its URL-friendly slug.
 * @param slug The slug of the category.
 * @returns A promise resolving to a Category object or null if not found.
 */
export async function getCategoryBySlug(
  slug: string,
): Promise<Category | null> {
  if (!slug) {
    console.error("getCategoryBySlug: slug is required.");
    return null;
  }

  try {
    const url = createApiUrl(`/categories/${slug}`);
    const response = await fetchWithRetry(url);

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`API error: ${response.status}`);
    }

    const data: { category: Category } = await response.json();
    return data.category;
  } catch (error) {
    console.error(`Error fetching category by slug "${slug}":`, error);
    return null;
  }
}
