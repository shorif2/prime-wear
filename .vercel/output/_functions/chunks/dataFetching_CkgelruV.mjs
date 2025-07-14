import { c as createApiUrl } from './Layout_BnXPpko-.mjs';
import { f as fetchWithRetry } from './authentication_BRtRS5JO.mjs';

async function getCollectionById(id) {
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
async function getAllCategories() {
  try {
    const isBrowser = typeof window !== "undefined";
    if (isBrowser && window.sessionStorage) {
      const cachedData = sessionStorage.getItem("categories:all");
      if (cachedData) {
        try {
          return JSON.parse(cachedData);
        } catch (e) {
          console.warn("Invalid cached categories data, fetching from API");
        }
      }
    }
    const response = await fetchWithRetry(createApiUrl("/categories"));
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    if (isBrowser && window.sessionStorage) {
      try {
        sessionStorage.setItem("categories:all", JSON.stringify(data));
      } catch (e) {
        console.warn("Failed to cache categories data:", e);
      }
    }
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null;
  }
}
async function getProductBySlug(slug) {
  try {
    const isBrowser = typeof window !== "undefined";
    if (isBrowser && window.sessionStorage) {
      const cachedData = sessionStorage.getItem(`product:${slug}`);
      if (cachedData) {
        try {
          return JSON.parse(cachedData);
        } catch (e) {
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
    if (isBrowser && window.sessionStorage) {
      try {
        sessionStorage.setItem(`product:${slug}`, JSON.stringify(data));
      } catch (e) {
        console.warn("Failed to cache product data:", e);
      }
    }
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export { getAllCategories as a, getCollectionById as b, getProductBySlug as g };
