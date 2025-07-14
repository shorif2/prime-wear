import { c as createComponent, b as createAstro, a as renderComponent, e as renderScript, r as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_DH_zCuNi.mjs';
import 'kleur/colors';
import { a as clearCart, B as Button, $ as $$Layout } from '../chunks/Layout_BnXPpko-.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { g as getOrderDetails } from '../chunks/orders_xF5Gfnx_.mjs';
/* empty css                                         */
export { renderers } from '../renderers.mjs';

function OrderSuccessButtons() {
  const [isAnimated, setIsAnimated] = useState(false);
  useEffect(() => {
    console.log("Order success page loaded, clearing cart");
    clearCart();
    setTimeout(() => {
      setIsAnimated(true);
    }, 300);
  }, []);
  const handleContinueShopping = () => {
    window.location.href = "/?clearCart=true";
  };
  const handlePrintOrder = () => {
    window.print();
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `flex flex-col items-center space-y-6 transition-opacity duration-500 ${isAnimated ? "opacity-100" : "opacity-0"} no-print`,
      children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-center gap-4 w-full max-w-md mt-6", children: [
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "outline",
            className: "border-2 border-black text-black font-medium py-3 px-6 rounded-xl hover:bg-gray-50 transition-all duration-200 flex-1",
            onClick: handleContinueShopping,
            children: [
              /* @__PURE__ */ jsx(
                "svg",
                {
                  className: "w-5 h-5 mr-2",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                    }
                  )
                }
              ),
              "Continue Shopping"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Button,
          {
            className: "bg-black text-white font-medium py-3 px-6 rounded-xl hover:bg-gray-800 transition-all duration-200 flex-1",
            onClick: handlePrintOrder,
            children: [
              /* @__PURE__ */ jsx(
                "svg",
                {
                  className: "w-5 h-5 mr-2",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                    }
                  )
                }
              ),
              "Print Receipt"
            ]
          }
        )
      ] })
    }
  );
}

const $$Astro = createAstro();
const $$OrderSuccess = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$OrderSuccess;
  const orderId = Astro2.url.searchParams.get("orderId");
  if (!orderId) {
    return Astro2.redirect("/");
  }
  let order = null;
  let errorFetching = false;
  try {
    order = await getOrderDetails(orderId);
    if (!order) {
      errorFetching = true;
      Astro2.response.status = 404;
    }
  } catch (e) {
    console.error(`Error fetching order details for ID ${orderId}:`, e);
    errorFetching = true;
    Astro2.response.status = 500;
  }
  if (errorFetching || !order) {
    return Astro2.redirect("/");
  }
  const orderItemsFromApi = order.items || [];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Order Successful", "data-astro-cid-fyie5mv7": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="container mx-auto px-4 py-8 max-w-2xl"${addAttribute(JSON.stringify({
    order,
    items: orderItemsFromApi
  }), "data-fb-order-details")} data-astro-cid-fyie5mv7> <div class="text-center mb-8 animate-fade-in" data-astro-cid-fyie5mv7> <div class="success-checkmark " data-astro-cid-fyie5mv7> <div class="check-icon" data-astro-cid-fyie5mv7> <span class="icon-line line-tip" data-astro-cid-fyie5mv7></span> <span class="icon-line line-long" data-astro-cid-fyie5mv7></span> <div class="icon-circle" data-astro-cid-fyie5mv7></div> <div class="icon-fix" data-astro-cid-fyie5mv7></div> </div> </div> <h1 class="text-2xl font-bold mb-2" data-astro-cid-fyie5mv7>Order Placed Successfully!</h1> <p class="text-gray-600" data-astro-cid-fyie5mv7>
Thank you for your order, #${order.id}. We'll start processing it right
        away.
</p> </div> <div class="space-y-6 animate-slide-up" data-astro-cid-fyie5mv7> <!-- Order details sections --> <div class="bg-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow" data-astro-cid-fyie5mv7> <h2 class="text-lg font-medium mb-4 flex items-center" data-astro-cid-fyie5mv7> <svg class="w-5 h-5 mr-2 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-fyie5mv7> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" data-astro-cid-fyie5mv7></path> </svg>
Order Details
</h2> <div class="space-y-4" data-astro-cid-fyie5mv7> <div class="flex justify-between" data-astro-cid-fyie5mv7> <span class="text-gray-600" data-astro-cid-fyie5mv7>Order ID:</span> <span class="font-medium" data-astro-cid-fyie5mv7>${order.id}</span> </div> <div class="flex justify-between" data-astro-cid-fyie5mv7> <span class="text-gray-600" data-astro-cid-fyie5mv7>Order Status:</span> <span class="font-medium capitalize bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-sm" data-astro-cid-fyie5mv7>${order.status}</span> </div> <div class="flex justify-between" data-astro-cid-fyie5mv7> <span class="text-gray-600" data-astro-cid-fyie5mv7>Total Amount:</span> <span class="font-medium" data-astro-cid-fyie5mv7>৳${order.totalAmount.toFixed(2)}</span> </div> ${order.shippingCharge > 0 && renderTemplate`<div class="flex justify-between" data-astro-cid-fyie5mv7> <span class="text-gray-600" data-astro-cid-fyie5mv7>Shipping Charge:</span> <span class="font-medium" data-astro-cid-fyie5mv7>
৳${order.shippingCharge.toFixed(2)} </span> </div>`} ${(order.discountAmount ?? 0) > 0 && renderTemplate`<div class="flex justify-between" data-astro-cid-fyie5mv7> <span class="text-gray-600" data-astro-cid-fyie5mv7>Discount:</span> <span class="font-medium text-green-600" data-astro-cid-fyie5mv7>
-৳${(order.discountAmount ?? 0).toFixed(2)} </span> </div>`} </div> </div> <div class="bg-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow" data-astro-cid-fyie5mv7> <h2 class="text-lg font-medium mb-4 flex items-center" data-astro-cid-fyie5mv7> <svg class="w-5 h-5 mr-2 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-fyie5mv7> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" data-astro-cid-fyie5mv7></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" data-astro-cid-fyie5mv7></path> </svg>
Shipping Details
</h2> <div class="space-y-2" data-astro-cid-fyie5mv7> <p data-astro-cid-fyie5mv7> <span class="text-gray-600" data-astro-cid-fyie5mv7>Name:</span>${" "} <span class="font-medium" data-astro-cid-fyie5mv7>${order.customerName}</span> </p> <p data-astro-cid-fyie5mv7> <span class="text-gray-600" data-astro-cid-fyie5mv7>Phone:</span>${" "} <span class="font-medium" data-astro-cid-fyie5mv7>${order.customerPhone}</span> </p> ${order.customerEmail && renderTemplate`<p data-astro-cid-fyie5mv7> <span class="text-gray-600" data-astro-cid-fyie5mv7>Email:</span>${" "} <span class="font-medium" data-astro-cid-fyie5mv7>${order.customerEmail}</span> </p>`} <p data-astro-cid-fyie5mv7> <span class="text-gray-600" data-astro-cid-fyie5mv7>Address:</span>${" "} <span class="font-medium" data-astro-cid-fyie5mv7>${order.shippingAddress}</span> </p> <div class="flex flex-col items-center md:items-start" data-astro-cid-fyie5mv7> <p class="flex items-center gap-1 text-sm" data-astro-cid-fyie5mv7> <span class="text-gray-600" data-astro-cid-fyie5mv7>City:</span>${" "} <span class="font-medium" data-astro-cid-fyie5mv7>${order.cityName || order.city}</span> </p> <p class="flex items-center gap-1 text-sm" data-astro-cid-fyie5mv7> <span class="text-gray-600" data-astro-cid-fyie5mv7>Zone:</span>${" "} <span class="font-medium" data-astro-cid-fyie5mv7>${order.zoneName || order.zone}</span> </p> ${(order.areaName || order.area) && renderTemplate`<p class="flex items-center gap-1 text-sm" data-astro-cid-fyie5mv7> <span class="text-gray-600" data-astro-cid-fyie5mv7>Area:</span>${" "} <span class="font-medium" data-astro-cid-fyie5mv7> ${order.areaName || order.area} </span> </p>`} </div> </div> </div> <div class="bg-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow" data-astro-cid-fyie5mv7> <h2 class="text-lg font-medium mb-4 flex items-center" data-astro-cid-fyie5mv7> <svg class="w-5 h-5 mr-2 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-fyie5mv7> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" data-astro-cid-fyie5mv7></path> </svg>
Order Items
</h2> <div class="space-y-4" data-astro-cid-fyie5mv7> ${orderItemsFromApi.map((item) => {
    return renderTemplate`<div class="flex justify-between items-center border-b border-gray-100 pb-3 last:border-0 last:pb-0" data-astro-cid-fyie5mv7> <div data-astro-cid-fyie5mv7> <p class="font-medium" data-astro-cid-fyie5mv7> ${item.productName || "Product Unavailable"} </p> ${(item.variantSize || item.variantColor) && renderTemplate`<p class="text-xs text-gray-500 mt-1" data-astro-cid-fyie5mv7> ${item.variantSize && renderTemplate`<span data-astro-cid-fyie5mv7>Size: ${item.variantSize}</span>`} ${item.variantSize && item.variantColor && renderTemplate`<span data-astro-cid-fyie5mv7> • </span>`} ${item.variantColor && renderTemplate`<span data-astro-cid-fyie5mv7>Color: ${item.variantColor}</span>`} </p>`} <p class="text-sm text-gray-600 mt-1" data-astro-cid-fyie5mv7>
Quantity: ${item.quantity} × ৳${item.price.toFixed(2)} </p> </div> <p class="font-medium" data-astro-cid-fyie5mv7>
৳${(item.quantity * item.price).toFixed(2)} </p> </div>`;
  })} </div> </div> </div> ${renderComponent($$result2, "OrderSuccessButtons", OrderSuccessButtons, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Projects/astro-ecommerce/prime-wear/src/components/OrderSuccessButtons", "client:component-export": "default", "data-astro-cid-fyie5mv7": true })} </main> ` })} ${renderScript($$result, "C:/Projects/astro-ecommerce/prime-wear/src/pages/order-success.astro?astro&type=script&index=0&lang.ts")} `;
}, "C:/Projects/astro-ecommerce/prime-wear/src/pages/order-success.astro", void 0);

const $$file = "C:/Projects/astro-ecommerce/prime-wear/src/pages/order-success.astro";
const $$url = "/order-success";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$OrderSuccess,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
