import type { CollectionsListData } from "../interface";
import { createApiUrl } from "../utils";
// import { createApiUrl } from "../utils";

// JWT token storage
let jwtToken: string | null = null;
let tokenExpiry: number | null = null;
let tokenRefreshPromise: Promise<string | null> | null = null;
const API_BASE_URL = import.meta.env.PUBLIC_API_URL || "/api/v1";

async function getJwtToken(): Promise<string | null> {
  // Check if token is expired or about to expire (within 5 minutes)
  const isExpiredOrExpiring =
    !jwtToken || !tokenExpiry || Date.now() > tokenExpiry - 5 * 60 * 1000;

  // If we have a valid token that's not expired or about to expire, return it
  if (!isExpiredOrExpiring) {
    return jwtToken;
  }

  // If we're already refreshing the token, return the promise
  if (tokenRefreshPromise) {
    return tokenRefreshPromise;
  }

  // Create a new token refresh promise
  tokenRefreshPromise = (async () => {
    try {
      // Get API token from environment variable
      const apiToken = import.meta.env.API_TOKEN;

      // Fetch a new token
      const response = await fetch(createApiUrl("/auth/token"), {
        headers: {
          "X-API-Token": apiToken,
        },
      });

      if (!response.ok) {
        console.error("Failed to get JWT token:", await response.text());
        return null;
      }

      const data = await response.json();
      jwtToken = data.data.token;

      // Parse the token to get expiry
      if (jwtToken) {
        const payload = JSON.parse(atob(jwtToken.split(".")[1]));
        tokenExpiry = payload.exp * 1000; // Convert to milliseconds
      }

      return jwtToken;
    } catch (error) {
      console.error("Error getting JWT token:", error);
      return null;
    } finally {
      // Clear the refresh promise so we can try again next time
      tokenRefreshPromise = null;
    }
  })();

  return tokenRefreshPromise;
}

export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries = 2,
  timeout = 5000,
  requiresAuth = true,
): Promise<Response> {
  // Create an AbortController to handle timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    // Get JWT token for authenticated requests
    let token: string | null = null;
    if (requiresAuth) {
      token = await getJwtToken();
    }

    // Add authorization header if token is available
    const headers = new Headers(options.headers || {});
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Check for a new token in the response headers
    const newToken = response.headers.get("X-New-Token");
    if (newToken) {
      jwtToken = newToken;
      // Parse the token to get new expiry
      const payload = JSON.parse(atob(newToken.split(".")[1]));
      tokenExpiry = payload.exp * 1000;
    }

    // Handle authentication errors
    if (response.status === 401 && requiresAuth && retries > 0) {
      // Clear the token and try again if we have retries left
      jwtToken = null;
      tokenExpiry = null;

      console.warn("Authentication failed, retrying with new token");
      return fetchWithRetry(url, options, retries - 1, timeout, requiresAuth);
    }

    return response;
  } catch (error) {
    clearTimeout(timeoutId);

    if (retries <= 0) throw error;

    console.warn(`Retrying fetch to ${url}, ${retries} retries left`);
    // Wait a bit before retrying (exponential backoff)
    await new Promise((resolve) => setTimeout(resolve, 200 * (3 - retries)));
    return fetchWithRetry(url, options, retries - 1, timeout, requiresAuth);
  }
}
