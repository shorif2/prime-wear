// src/lib/api/widgets.ts

import type { ApiWidget } from "../interface";
import { createApiUrl } from "../utils";
import { fetchWithRetry } from "./authentication";

/**
 * Fetches all widgets that are active and configured for the homepage.
 * The widgets are pre-sorted by their placement rule and sort order.
 *
 * @returns A promise resolving to an array of ApiWidget objects or null on failure.
 */
export async function getActiveHomepageWidgets(): Promise<ApiWidget[] | null> {
  try {
    const url = createApiUrl("/widgets/active/homepage");
    // Widgets are public content.
    const response = await fetchWithRetry(url, {}, 3, 8000, false);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: { widgets: ApiWidget[] } = await response.json();
    return data.widgets;
  } catch (error) {
    console.error("Error fetching active homepage widgets:", error);
    return null;
  }
}

/**
 * Fetches a single widget by its unique ID.
 *
 * @param widgetId The ID of the widget to retrieve.
 * @returns A promise resolving to a single ApiWidget object or null if not found.
 */
export async function getWidgetById(
  widgetId: string,
): Promise<ApiWidget | null> {
  if (!widgetId) {
    console.error("getWidgetById: widgetId is required.");
    return null;
  }

  try {
    const url = createApiUrl(`/widgets/${widgetId}`);
    // This could be public or protected depending on use case; assuming public for now.
    const response = await fetchWithRetry(url, {}, 3, 8000, false);

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`API error: ${response.status}`);
    }

    const data: { widget: ApiWidget; success: boolean } = await response.json();
    return data.success ? data.widget : null;
  } catch (error) {
    console.error(`Error fetching widget by ID "${widgetId}":`, error);
    return null;
  }
}
