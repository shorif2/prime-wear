import { c as createComponent, b as createAstro, m as maybeRenderHead, d as addAttribute, r as renderTemplate } from './astro/server_BTOzv46n.mjs';
import 'kleur/colors';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const API_BASE_URL = "https://demo.scalius.com/api/v1";
console.log(API_BASE_URL);
function createApiUrl(path) {
  return `${API_BASE_URL}${path}`;
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const $$Astro = createAstro();
const $$ProductCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ProductCard;
  const { product } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="bg-white shadow rounded overflow-hidden group"> <div class="relative"> <img${addAttribute(product?.imageUrl, "src")} alt="product 1" class="w-full"> <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center
                    justify-center gap-2 opacity-0 group-hover:opacity-100 transition"> <a href="#" class="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition" title="view product"></a><a class="fa-solid fa-magnifying-glass"></a> <a href="#" class="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition" title="add to wishlist"></a><a class="fa-solid fa-heart"></a> </div> </div> <div class="pt-4 pb-3 px-4"> <a${addAttribute(`/products/${product?.slug}`, "href")}> <h4 class="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition"> ${product?.name} </h4> </a> <div class="flex items-baseline mb-1 space-x-2"> <p class="text-xl text-primary font-semibold">
$${product?.price} </p> <p class="text-sm text-gray-400 line-through">
$${product?.discountedPrice} </p> </div> <div class="flex items-center"> <div class="flex gap-1 text-sm text-yellow-400"> <span> <i class="fa-solid fa-star"></i> </span> <span> <i class="fa-solid fa-star"></i> </span> <span> <i class="fa-solid fa-star"></i> </span> <span> <i class="fa-solid fa-star"></i> </span> <span> <i class="fa-solid fa-star"></i> </span> </div> <div class="text-xs text-gray-500 ml-3">(150)</div> </div> </div> <a href="#" class="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition">
Add to cart
</a> </div>`;
}, "C:/Projects/Scalius/prime-wear/src/components/HomeComponents/ProductCard.astro", void 0);

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

export { $$ProductCard as $, getAllCategories as a, getCollectionById as b, cn as c, getProductBySlug as g };
