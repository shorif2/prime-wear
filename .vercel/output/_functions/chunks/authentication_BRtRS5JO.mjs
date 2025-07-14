import { c as createApiUrl } from './Layout_BnXPpko-.mjs';

let jwtToken = null;
let tokenExpiry = null;
let tokenRefreshPromise = null;
async function getJwtToken() {
  const isExpiredOrExpiring = !jwtToken || !tokenExpiry || Date.now() > tokenExpiry - 5 * 60 * 1e3;
  if (!isExpiredOrExpiring) {
    return jwtToken;
  }
  if (tokenRefreshPromise) {
    return tokenRefreshPromise;
  }
  tokenRefreshPromise = (async () => {
    try {
      const apiToken = "adsfsdfkljhadgsfIUYJJHbkjbas87aoo78n348jkldasfgjhasdfiuuyoiejhasdfb";
      const response = await fetch(createApiUrl("/auth/token"), {
        headers: {
          "X-API-Token": apiToken
        }
      });
      if (!response.ok) {
        console.error("Failed to get JWT token:", await response.text());
        return null;
      }
      const data = await response.json();
      jwtToken = data.data.token;
      if (jwtToken) {
        const payload = JSON.parse(atob(jwtToken.split(".")[1]));
        tokenExpiry = payload.exp * 1e3;
      }
      return jwtToken;
    } catch (error) {
      console.error("Error getting JWT token:", error);
      return null;
    } finally {
      tokenRefreshPromise = null;
    }
  })();
  return tokenRefreshPromise;
}
async function fetchWithRetry(url, options = {}, retries = 2, timeout = 5e3, requiresAuth = true) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  try {
    let token = null;
    if (requiresAuth) {
      token = await getJwtToken();
    }
    const headers = new Headers(options.headers || {});
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    const newToken = response.headers.get("X-New-Token");
    if (newToken) {
      jwtToken = newToken;
      const payload = JSON.parse(atob(newToken.split(".")[1]));
      tokenExpiry = payload.exp * 1e3;
    }
    if (response.status === 401 && requiresAuth && retries > 0) {
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
    await new Promise((resolve) => setTimeout(resolve, 200 * (3 - retries)));
    return fetchWithRetry(url, options, retries - 1, timeout, requiresAuth);
  }
}

export { fetchWithRetry as f };
