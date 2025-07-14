import { c as createApiUrl } from './Layout_BnXPpko-.mjs';
import { f as fetchWithRetry } from './authentication_BRtRS5JO.mjs';

async function createOrder(payload) {
  try {
    const url = createApiUrl("/orders");
    const response = await fetchWithRetry(
      url,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      },
      2,
      15e3,
      // Longer timeout for order creation
      true
      // Requires authentication
    );
    const data = await response.json();
    if (!response.ok || !data.success) {
      console.error(
        "Failed to create order:",
        data.error || response.statusText
      );
      return { success: false, error: data.error };
    }
    return { success: true, orderId: data.data.id };
  } catch (error) {
    console.error("Error creating order:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Network error occurred"
    };
  }
}
async function getOrderDetails(orderId) {
  if (!orderId) {
    console.error("getOrderDetails: orderId is required.");
    return null;
  }
  try {
    const url = createApiUrl(`/orders/${orderId}`);
    const response = await fetchWithRetry(url);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return data.order;
  } catch (error) {
    console.error(`Error fetching details for order "${orderId}":`, error);
    return null;
  }
}

export { createOrder as c, getOrderDetails as g };
