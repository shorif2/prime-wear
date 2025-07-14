import { createOrder } from "../apiRequest/orders";
import type { CreateOrderPayload, LocationData } from "../interface";
import {
  getAreas,
  getCities as getCitiesFromApi,
  getShippingMethods,
  getZones,
} from "../apiRequest/shipping";
import { getProductBySlug } from "../apiRequest/dataFetching";
import { recordDiscountUsage, validateDiscount } from "../apiRequest/discounts";

export async function getCities(): Promise<LocationData[]> {
  try {
    const citiesData = await getCitiesFromApi();
    return citiesData || [];
  } catch (error) {
    console.error("Failed to fetch cities from API via library:", error);
    return [];
  }
}

export async function processOrder(formData: FormData) {
  try {
    const customerName = formData.get("customerName") as string;
    let customerPhone = (formData.get("customerPhone") as string)
      .replace(/^\+?880/, "")
      .trim();
    if (customerPhone.startsWith("1")) {
      customerPhone = "0" + customerPhone;
    }
    const customerEmail = (formData.get("customerEmail") as string) || null;
    const shippingAddress = formData.get("shippingAddress") as string;
    const cityId = formData.get("city") as string;
    const zoneId = formData.get("zone") as string;
    const areaId = (formData.get("area") as string) || null;
    const notes = (formData.get("notes") as string) || null;
    const cartItemsJson = formData.get("cartItems") as string;
    const shippingLocationId = formData.get("shippingLocation") as string;
    const discountJson = formData.get("discountCodeHidden") as string;

    const cartItems = JSON.parse(cartItemsJson);
    const cartItemsArray = Object.values(cartItems) as any[];

    if (
      !customerName ||
      !customerPhone ||
      !shippingAddress ||
      !cityId ||
      !zoneId ||
      !shippingLocationId ||
      cartItemsArray.length === 0
    ) {
      throw new Error(
        "Please fill in all required fields and add items to your cart.",
      );
    }
    if (!/^01[3-9]\d{8}$/.test(customerPhone)) {
      throw new Error("Please enter a valid Bangladeshi phone number");
    }

    let cityName: string | null = null;
    let zoneName: string | null = null;
    let areaName: string | null = null;

    try {
      const allCities = await getCitiesFromApi();
      const city = allCities?.find((c) => c.id === cityId);
      if (city) cityName = city.name;

      if (zoneId) {
        const allZones = await getZones(cityId);
        const zone = allZones?.find((z) => z.id === zoneId);
        if (zone) zoneName = zone.name;
      }

      if (areaId && zoneId) {
        const allAreas = await getAreas(zoneId);
        const area = allAreas?.find((a) => a.id === areaId);
        if (area) areaName = area.name;
      }
    } catch (locationError) {
      console.error("Error fetching location names:", locationError);
    }

    let shippingCharge = 0;
    const allShippingMethods = await getShippingMethods();
    const selectedMethod = allShippingMethods?.find(
      (method) => method.id === shippingLocationId,
    );
    if (selectedMethod) {
      shippingCharge = selectedMethod.fee;
    } else {
      throw new Error("Invalid shipping method selected.");
    }

    // --- PERFORMANCE OPTIMIZATION: Fetch all product data in parallel ---
    const productPromises = cartItemsArray.map((item) =>
      getProductBySlug(item.slug || item.id),
    );
    const productDataResults = await Promise.all(productPromises);

    const processedItems: CreateOrderPayload["items"] = [];
    let subtotal = 0;

    for (let i = 0; i < cartItemsArray.length; i++) {
      const item = cartItemsArray[i];
      const productData = productDataResults[i];

      if (!productData) {
        throw new Error(`Product "${item.name}" is no longer available.`);
      }

      const { product, variants } = productData;
      let finalPrice = product.discountedPrice;
      let variantId: string | null = null;
      let availableStock = 0;

      if (item.variantId && item.variantId !== "default") {
        const variant = variants.find((v) => v.id === item.variantId);
        if (variant) {
          variantId = variant.id;
          finalPrice = variant.price || product.price;
          if (product.discountPercentage > 0) {
            finalPrice = Math.round(
              finalPrice * (1 - product.discountPercentage / 100),
            );
          }
          availableStock = variant.stock;
        } else {
          throw new Error(
            `Selected variant for "${product.name}" is no longer available.`,
          );
        }
      } else {
        // If no variant is specified, stock is the sum of all available variants
        availableStock = variants.reduce((sum, v) => sum + v.stock, 0);
      }

      if (availableStock < item.quantity) {
        throw new Error(
          `Insufficient stock for ${product.name}. Available: ${availableStock}, Requested: ${item.quantity}`,
        );
      }

      subtotal += finalPrice * item.quantity;
      processedItems.push({
        productId: product.id,
        variantId: variantId,
        quantity: item.quantity,
        price: finalPrice,
      });
    }

    let discountId: string | null = null;
    let discountAmount: number | null = null;
    let discountCode: string | null = null;
    let finalNotes = notes || "";

    if (discountJson) {
      const discountData = JSON.parse(discountJson);
      const validationResult = await validateDiscount(
        discountData.code,
        subtotal,
        Object.values(cartItems),
        shippingCharge,
        customerPhone,
      );

      if (!validationResult?.valid) {
        throw new Error(
          validationResult?.error || "The applied discount is no longer valid.",
        );
      }

      discountId = validationResult.discount?.id || null;
      discountAmount = validationResult.discountAmount || null;
      discountCode = validationResult.discount?.code || null;

      if (discountAmount && discountCode) {
        const note = `[Discount Applied: ${discountCode} (-৳${discountAmount})]`;
        finalNotes = finalNotes ? `${finalNotes}\n${note}` : note;
      }
    }

    const payload: CreateOrderPayload = {
      customerName,
      customerPhone,
      customerEmail,
      shippingAddress,
      city: cityId,
      zone: zoneId,
      area: areaId,
      cityName,
      zoneName,
      areaName,
      notes: finalNotes,
      items: processedItems,
      shippingCharge,
      discountAmount,
    };

    const result = await createOrder(payload);

    if (
      result.success &&
      result.orderId &&
      discountId &&
      discountAmount &&
      discountAmount > 0
    ) {
      await recordDiscountUsage(
        discountId,
        result.orderId,
        null,
        discountAmount,
      );
    }

    return result;
  } catch (error) {
    console.error("Order processing failed:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? { message: error.message }
          : { message: "An unexpected error occurred" },
    };
  }
}
