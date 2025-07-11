/**
 * Fetches a collection by its ID with all related data
 */

import type {
  CategoriesListData,
  CollectionData,
  CollectionsListData,
  ProductPageData,
} from "../interface";
import { createApiUrl } from "../utils";
import { fetchWithRetry } from "./authentication";

// Fetches All Collection
export async function getAllCollections(): Promise<CollectionsListData | null> {
  try {
    const response = await fetchWithRetry(createApiUrl("/collections"));

    if (!response.ok) {
      console.error("Failed to fetch collections:", await response.text());
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching collections:", error);
    return null;
  }
}
// Fetches  Collection By ID
export async function getCollectionById(
  id: string,
): Promise<CollectionData | null> {
  try {
    const response = await fetchWithRetry(createApiUrl(`/collections/${id}`));

    if (!response.ok) {
      console.error("Failed to fetch collection:", await response.text());
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching collection:", error);
    return null;
  }
}
// Fetches all categories
export async function getAllCategories(): Promise<CategoriesListData | null> {
  try {
    // Check browser cache first if available
    const isBrowser = typeof window !== "undefined";
    if (isBrowser && window.sessionStorage) {
      const cachedData = sessionStorage.getItem("categories:all");
      if (cachedData) {
        try {
          return JSON.parse(cachedData) as CategoriesListData;
        } catch (e) {
          // Invalid JSON, ignore and fetch from API
          console.warn("Invalid cached categories data, fetching from API");
        }
      }
    }

    const response = await fetchWithRetry(createApiUrl("/categories"));

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    // Cache the data in sessionStorage for future requests
    if (isBrowser && window.sessionStorage) {
      try {
        sessionStorage.setItem("categories:all", JSON.stringify(data));
      } catch (e) {
        // Storage might be full or other issues, just log and continue
        console.warn("Failed to cache categories data:", e);
      }
    }

    return data as CategoriesListData;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null;
  }
}

// Fetches a product by its slug with complete details
export async function getProductBySlug(
  slug: string,
): Promise<ProductPageData | null> {
  try {
    // Check browser cache first if available
    const isBrowser = typeof window !== "undefined";
    if (isBrowser && window.sessionStorage) {
      const cachedData = sessionStorage.getItem(`product:${slug}`);
      if (cachedData) {
        try {
          return JSON.parse(cachedData) as ProductPageData;
        } catch (e) {
          // Invalid JSON, ignore and fetch from API
          console.warn("Invalid cached product data, fetching from API");
        }
      }
    }

    const response = await fetchWithRetry(createApiUrl(`/products/${slug}`));

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    // Cache the data in sessionStorage for future requests
    if (isBrowser && window.sessionStorage) {
      try {
        sessionStorage.setItem(`product:${slug}`, JSON.stringify(data));
      } catch (e) {
        // Storage might be full or other issues, just log and continue
        console.warn("Failed to cache product data:", e);
      }
    }

    return data as ProductPageData;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}
