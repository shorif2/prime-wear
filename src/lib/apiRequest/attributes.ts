// src/lib/api/attributes.ts

import type { FilterableAttribute } from "../interface";
import { createApiUrl } from "../utils";
import { fetchWithRetry } from "./authentication";

/**
 * Fetches the filterable attributes and their unique values.
 * This can be scoped to a specific category or search query.
 *
 * @param options An object with either 'categorySlug' or 'searchQuery'.
 * @returns A promise resolving to an array of filterable attributes or null on failure.
 */
export async function getFilterableAttributes(
  options: { categorySlug?: string; searchQuery?: string } = {},
): Promise<FilterableAttribute[] | null> {
  try {
    let url: string;

    if (options.categorySlug) {
      // Use the new endpoint for category-specific filters
      url = createApiUrl(`/attributes/category-slug/${options.categorySlug}`);
    } else if (options.searchQuery) {
      // Use the new endpoint for search-specific filters
      const params = new URLSearchParams({ q: options.searchQuery });
      url = createApiUrl(`/attributes/search-filters?${params.toString()}`);
    } else {
      // Fallback to the general filterable attributes endpoint
      url = createApiUrl("/attributes/filterable");
    }

    const response = await fetchWithRetry(url, {}, 3, 8000, false);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: { filters: FilterableAttribute[] } = await response.json();
    return data.filters;
  } catch (error) {
    console.error("Error fetching filterable attributes:", error);
    return null;
  }
}
