// src/lib/api/settings.ts

import type {
  AnalyticsConfig,
  CheckoutLanguageData,
  SeoSettings,
} from "../interface";
import { createApiUrl } from "../utils";
import { fetchWithRetry } from "./authentication";

// ADDED THIS INTERFACE
/**
 * Defines the structure for the hero slider data, containing separate
 * configurations for desktop and mobile, along with resolved images.
 */
export interface HeroSliderData {
  desktop: {
    id: string;
    type: "desktop";
    images: { url: string; title?: string; link: string; id?: string }[];
  } | null;
  mobile: {
    id: string;
    type: "mobile";
    images: { url: string; title?: string; link: string; id?: string }[];
  } | null;
  images: { url: string; title?: string; link: string; id?: string }[];
  isMobile: boolean;
}

/**
 * Fetches the global SEO settings for the site.
 * This includes site titles, meta descriptions, and robots.txt content.
 *
 * @returns A promise resolving to the SeoSettings object or null on failure.
 */
export async function getSeoSettings(): Promise<SeoSettings | null> {
  try {
    const url = createApiUrl("/seo");
    const response = await fetchWithRetry(url, {}, 3, 8000, false);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: SeoSettings & { success: boolean } = await response.json();
    return data.success ? data : null;
  } catch (error) {
    console.error("Error fetching SEO settings:", error);
    return null;
  }
}

/**
 * Fetches all active analytics configurations (e.g., Google Analytics, Facebook Pixel).
 *
 * @returns A promise resolving to an array of AnalyticsConfig objects or null on failure.
 */
export async function getAnalyticsConfigurations(): Promise<
  AnalyticsConfig[] | null
> {
  try {
    const url = createApiUrl("/analytics/configurations");
    const response = await fetchWithRetry(url, {}, 3, 8000, false);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: { analytics: AnalyticsConfig[] } = await response.json();
    return data.analytics;
  } catch (error) {
    console.error("Error fetching analytics configurations:", error);
    return null;
  }
}

/**
 * Fetches the active language configuration for the checkout page.
 * This includes all labels, placeholders, and field visibility settings.
 *
 * @returns A promise that resolves to the checkout language data or null on failure.
 */
export async function getActiveCheckoutLanguage(): Promise<CheckoutLanguageData | null> {
  try {
    const url = createApiUrl("/checkout-languages/active");
    const response = await fetchWithRetry(url, {}, 3, 8000, false);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: { language: CheckoutLanguageData } = await response.json();
    return data.language;
  } catch (error) {
    console.error("Error fetching active checkout language:", error);
    return null;
  }
}

// ADDED THIS FUNCTION
/**
 * Fetches hero sliders for the homepage. The API intelligently returns the appropriate
 * sliders (desktop/mobile) based on the User-Agent header of the request.
 *
 * @returns A promise resolving to the HeroSliderData object or null on failure.
 */
export async function getHeroSliders(): Promise<HeroSliderData | null> {
  try {
    const url = createApiUrl("/hero/sliders");
    const response = await fetchWithRetry(url, {}, 3, 8000, false);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return (await response.json()) as HeroSliderData;
  } catch (error) {
    console.error("Error fetching hero sliders:", error);
    return null;
  }
}
