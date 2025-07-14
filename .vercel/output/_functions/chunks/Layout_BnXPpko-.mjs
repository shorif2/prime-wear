import { c as createComponent, m as maybeRenderHead, r as renderTemplate, a as renderComponent, b as createAstro, d as addAttribute, e as renderScript, h as renderHead, i as renderSlot } from './astro/server_DH_zCuNi.mjs';
import 'kleur/colors';
import { clsx } from 'clsx';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { atom, map } from 'nanostores';
import { s as styles } from './cart.9e6f5f2b_DNfEmW5v.mjs';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { X } from 'lucide-react';

const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<nav class="bg-gray-800"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex"> <div class="px-8 py-4 bg-primary md:flex items-center cursor-pointer relative group hidden"> <span class="text-white"> <i class="fa-solid fa-bars"></i> </span> <span class="capitalize ml-2 text-white hidden">All Categories</span> <!-- dropdown --> <div class="absolute left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible w-[600px]" style="width: 300px;"> <a href="#" class="flex items-center px-6 py-3 hover:bg-gray-100 transition"> <img src="/images/icons/sofa.svg" alt="sofa" class="w-5 h-5 object-contain"> <span class="ml-6 text-gray-600 text-sm">Sofa</span> </a> <a href="#" class="flex items-center px-6 py-3 hover:bg-gray-100 transition"> <img src="/images/icons/terrace.svg" alt="terrace" class="w-5 h-5 object-contain"> <span class="ml-6 text-gray-600 text-sm">Living Room</span> </a> <a href="#" class="flex items-center px-6 py-3 hover:bg-gray-100 transition"> <img src="/images/icons/bed.svg" alt="bed" class="w-5 h-5 object-contain"> <span class="ml-6 text-gray-600 text-sm">Bedroom</span> </a> <a href="#" class="flex items-center px-6 py-3 hover:bg-gray-100 transition"> <img src="/images/icons/office.svg" alt="Outdoor" class="w-5 h-5 object-contain"> <span class="ml-6 text-gray-600 text-sm">Outdoor</span> </a> <a href="#" class="flex items-center px-6 py-3 hover:bg-gray-100 transition"> <img src="/images/icons/outdoor-cafe.svg" alt="outdoor" class="w-5 h-5 object-contain"> <span class="ml-6 text-gray-600 text-sm">Outdoor</span> </a> <a href="#" class="flex items-center px-6 py-3 hover:bg-gray-100 transition"> <img src="/images/icons/bed-2.svg" alt="Mattress" class="w-5 h-5 object-contain"> <span class="ml-6 text-gray-600 text-sm">Mattress</span> </a> </div> </div> <div class="flex items-center justify-between flex-grow md:pl-12 py-5"> <div class="flex items-center space-x-6 capitalize"> <a href="/" class="text-gray-200 hover:text-white transition">Home</a> <a href="/shop" class="text-gray-200 hover:text-white transition">Shop</a> <a href="#" class="text-gray-200 hover:text-white transition">About us</a> <a href="#" class="text-gray-200 hover:text-white transition">Contact us</a> </div> <div class="flex items-center space-x-4"> <a href="/login" class="text-gray-200 hover:text-white transition">Login</a> </div> </div> </div> </nav>`;
}, "C:/Projects/astro-ecommerce/prime-wear/src/components/Navbar.astro", void 0);

const isCartOpen = atom(false);
const initialState = typeof window !== "undefined" ? JSON.parse(
  localStorage.getItem("cart") || '{"items":{},"totalItems":0,"totalAmount":0,"discount":null}'
) : {
  items: {},
  totalItems: 0,
  totalAmount: 0,
  discount: null
};
const cartStore = map(initialState);
if (typeof window !== "undefined") {
  cartStore.subscribe((state) => {
    localStorage.setItem("cart", JSON.stringify(state));
  });
}
function generateCartItemKey(item) {
  if (item.variantId && item.variantId !== "default") {
    return `${item.id}-${item.variantId}`;
  }
  if (item.size || item.color) {
    const sizeKey = item.size || "no-size";
    const colorKey = item.color || "no-color";
    return `${item.id}-${sizeKey}-${colorKey}`;
  }
  return item.id;
}
function addToCart(item) {
  const currentItems = cartStore.get().items;
  const itemKey = generateCartItemKey(item);
  const existingItem = currentItems[itemKey];
  const quantity = item.quantity || 1;
  if (existingItem) {
    cartStore.setKey("items", {
      ...currentItems,
      [itemKey]: {
        ...existingItem,
        quantity: existingItem.quantity + quantity
      }
    });
  } else {
    cartStore.setKey("items", {
      ...currentItems,
      [itemKey]: {
        ...item,
        quantity
        // Use the specified quantity
      }
    });
  }
  updateCartTotals();
  if (typeof document !== "undefined") {
    document.dispatchEvent(new CustomEvent("cart-updated"));
  }
}
function removeFromCart(itemId, variantId) {
  const currentItems = cartStore.get().items;
  let itemKey = itemId;
  if (!currentItems[itemKey]) {
    const foundKey = Object.keys(currentItems).find(
      (key) => key.startsWith(itemId) || key === itemId
    );
    if (foundKey) {
      itemKey = foundKey;
    }
  }
  const newItems = { ...currentItems };
  delete newItems[itemKey];
  cartStore.setKey("items", newItems);
  updateCartTotals();
}
function updateQuantity(itemId, variantId, quantity) {
  console.log(itemId, variantId, quantity);
  const currentItems = cartStore.get().items;
  let itemKey = itemId;
  if (!currentItems[itemKey]) {
    const foundKey = Object.keys(currentItems).find(
      (key) => key.startsWith(itemId) || key === itemId
    );
    if (foundKey) {
      itemKey = foundKey;
    }
  }
  const existingItem = currentItems[itemKey];
  if (!existingItem) return;
  if (quantity <= 0) {
    removeFromCart(itemId);
    return;
  }
  cartStore.setKey("items", {
    ...currentItems,
    [itemKey]: {
      ...existingItem,
      quantity
    }
  });
  updateCartTotals();
}
function clearCart() {
  cartStore.set({
    items: {},
    totalItems: 0,
    totalAmount: 0,
    discount: null
  });
}
function updateCartTotals() {
  const state = cartStore.get();
  const items = Object.values(state.items);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  cartStore.setKey("totalItems", totalItems);
  cartStore.setKey("totalAmount", totalAmount);
  if (totalItems === 0 && state.discount) {
    cartStore.setKey("discount", null);
  }
}

function CartFlyoutIcon() {
  const $isOpen = useStore(isCartOpen);
  const { items, totalAmount, totalItems } = useStore(cartStore);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick: () => isCartOpen.set(!$isOpen),
      id: "cartButton",
      className: "flex justify-end items-center space-x-4",
      children: [
        /* @__PURE__ */ jsx("i", { className: "fa-solid fa-bag-shopping text-xl" }),
        mounted && totalItems > 0 && /* @__PURE__ */ jsx("span", { id: "cartCount", className: "ml-4 text-sm font-medium", children: totalItems })
      ]
    }
  );
}

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header class="py-4 shadow-sm bg-white"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between"> <a href="index.html"> <img src="/logo.heif" alt="Logo" class="w-32"> </a> <div class="w-full max-w-xl relative flex"> <span class="absolute left-4 top-3 text-lg text-gray-400"> <i class="fa-solid fa-magnifying-glass"></i> </span> <input type="text" name="search" id="search" class="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none hidden md:flex" placeholder="search"> <button class="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition hidden md:flex justify-center items-center">Search</button> </div> ${renderComponent($$result, "CartFlyoutIcon", CartFlyoutIcon, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Projects/astro-ecommerce/prime-wear/src/components/ui/CartFlyoutIcon", "client:component-export": "default" })} </div> </header>`;
}, "C:/Projects/astro-ecommerce/prime-wear/src/components/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="bg-white pt-16 pb-12 border-t border-gray-100"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1"> <div class="col-span-1 space-y-4"> <img src="/logo.heif" alt="logo" class="w-30"> <div class="mr-2"> <p class="text-gray-500">
Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, hic?
</p> </div> <div class="flex space-x-5"> <a href="#" class="text-gray-400 hover:text-gray-500"><i class="fa-brands fa-facebook-square"></i></a> <a href="#" class="text-gray-400 hover:text-gray-500"><i class="fa-brands fa-instagram-square"></i></a> <a href="#" class="text-gray-400 hover:text-gray-500"><i class="fa-brands fa-twitter-square"></i></a> <a href="#" class="text-gray-400 hover:text-gray-500"> <i class="fa-brands fa-github-square"></i> </a> </div> </div> <div class="col-span-2 grid grid-cols-2 gap-4"> <div class="grid grid-cols-2 gap-4 md:gap-8"> <div> <h3 class="text-sm font-semibold text-gray-400 uppercase tracking-wider">
Solutions
</h3> <div class="mt-4 space-y-4"> <a href="#" class="text-base text-gray-500 hover:text-gray-900 block">Marketing</a> <a href="#" class="text-base text-gray-500 hover:text-gray-900 block">Analitycs</a> <a href="#" class="text-base text-gray-500 hover:text-gray-900 block">Commerce</a> <a href="#" class="text-base text-gray-500 hover:text-gray-900 block">Insights</a> </div> </div> <div> <h3 class="text-sm font-semibold text-gray-400 uppercase tracking-wider">
Support
</h3> <div class="mt-4 space-y-4"> <a href="#" class="text-base text-gray-500 hover:text-gray-900 block">Pricing</a> <!-- <a href="#" class="text-base text-gray-500 hover:text-gray-900 block">Documentation</a> --> <a href="#" class="text-base text-gray-500 hover:text-gray-900 block">Guides</a> <a href="#" class="text-base text-gray-500 hover:text-gray-900 block">API Status</a> </div> </div> </div> <div class="grid grid-cols-2 gap-8"> <div> <h3 class="text-sm font-semibold text-gray-400 uppercase tracking-wider">
Solutions
</h3> <div class="mt-4 space-y-4"> <a href="#" class="text-base text-gray-500 hover:text-gray-900 block">Marketing</a> <a href="#" class="text-base text-gray-500 hover:text-gray-900 block">Analitycs</a> <a href="#" class="text-base text-gray-500 hover:text-gray-900 block">Commerce</a> <a href="#" class="text-base text-gray-500 hover:text-gray-900 block">Insights</a> </div> </div> <div> <h3 class="text-sm font-semibold text-gray-400 uppercase tracking-wider">
Support
</h3> <div class="mt-4 space-y-4"> <a href="#" class="text-base text-gray-500 hover:text-gray-900 block">Pricing</a> <!-- <a href="#" class="text-base text-gray-500 hover:text-gray-900 block">Documentation</a> --> <a href="#" class="text-base text-gray-500 hover:text-gray-900 block">Guides</a> <a href="#" class="text-base text-gray-500 hover:text-gray-900 block">API Status</a> </div> </div> </div> </div> </div> </footer>`;
}, "C:/Projects/astro-ecommerce/prime-wear/src/components/Footer.astro", void 0);

const $$Copywrite = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="bg-gray-800 py-4"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between"> <p class="text-white">&copy; Scalius - All Right Reserved</p> <div> <img src="/images/methods.png" alt="methods" class="h-5"> </div> </div> </div>`;
}, "C:/Projects/astro-ecommerce/prime-wear/src/components/Copywrite.astro", void 0);

const $$Astro$1 = createAstro();
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "C:/Projects/astro-ecommerce/prime-wear/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Projects/astro-ecommerce/prime-wear/node_modules/astro/components/ClientRouter.astro", void 0);

const API_BASE_URL = "https://demo.scalius.com/api/v1";
console.log(API_BASE_URL);
function createApiUrl(path) {
  return `${API_BASE_URL}${path}`;
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
process.env.NODE_ENV === "development";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.97] active:translate-y-[1px] shadow-[0_2px_0_rgba(0,0,0,0.1)] relative after:absolute after:inset-0 after:rounded-md after:shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] after:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-b from-primary to-primary/95 text-primary-foreground shadow-md hover:shadow-lg hover:from-primary/95 hover:to-primary/90 border border-primary/20 after:shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]",
        destructive: "bg-gradient-to-b from-destructive to-destructive/95 text-destructive-foreground shadow-md hover:shadow-lg hover:from-destructive/95 hover:to-destructive/90 border border-destructive/20 after:shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]",
        outline: "border-2 border-input bg-background/90 shadow-sm hover:bg-accent/50 hover:text-accent-foreground hover:border-accent/50 backdrop-blur-sm after:shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]",
        secondary: "bg-gradient-to-b from-secondary to-secondary/95 text-secondary-foreground shadow-sm hover:shadow hover:from-secondary/95 hover:to-secondary/90 border border-secondary/30 after:shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]",
        ghost: "hover:bg-accent/40 hover:text-accent-foreground hover:shadow-sm shadow-none after:shadow-none",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80 shadow-none after:shadow-none",
        subtle: "bg-gradient-to-b from-primary/15 to-primary/10 text-primary hover:from-primary/20 hover:to-primary/15 border border-primary/20 shadow-sm after:shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8 text-base",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";

function CartFlyout() {
  const $isOpen = useStore(isCartOpen);
  const { items, totalAmount, totalItems } = useStore(cartStore);
  const handleQuantityChange = (id, newQuantity) => {
    updateQuantity(id, "default", newQuantity);
  };
  const handleRemoveItem = (id) => {
  };
  if (!$isOpen) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: styles.overlay, onClick: () => isCartOpen.set(false) }),
    /* @__PURE__ */ jsxs("aside", { className: styles.container, children: [
      /* @__PURE__ */ jsxs("div", { className: styles.header, children: [
        /* @__PURE__ */ jsx("h2", { children: "Shopping Cart" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => isCartOpen.set(false),
            className: styles.closeButton,
            children: "×"
          }
        )
      ] }),
      Object.values(items).length ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("ul", { className: styles.list, role: "list", children: Object.values(items).map((cartItem) => /* @__PURE__ */ jsxs("li", { className: styles.listItem, children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              className: styles.listItemImg,
              src: cartItem.image,
              alt: cartItem.name
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: styles.itemDetails, children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-sm", children: cartItem.name }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "h-6 w-6 rounded-full -mt-1 -mr-1",
                  onClick: () => handleRemoveItem(cartItem.id),
                  children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("p", { className: styles.itemPrice, children: [
              "$",
              cartItem.price.toFixed(2)
            ] }),
            /* @__PURE__ */ jsxs("div", { className: styles.quantityControls, children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleQuantityChange(
                    cartItem.id,
                    cartItem.quantity - 1
                  ),
                  className: styles.quantityBtn,
                  disabled: cartItem.quantity <= 1,
                  children: "-"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: styles.quantity, children: cartItem.quantity }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleQuantityChange(
                    cartItem.id,
                    cartItem.quantity + 1
                  ),
                  className: styles.quantityBtn,
                  children: "+"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("p", { className: styles.itemTotal, children: [
              "Total: $",
              (cartItem.price * cartItem.quantity).toFixed(2)
            ] })
          ] })
        ] }, cartItem.id)) }),
        /* @__PURE__ */ jsxs("div", { className: styles.cartFooter, children: [
          /* @__PURE__ */ jsx("div", { className: styles.total, children: /* @__PURE__ */ jsxs("strong", { children: [
            "Total: $",
            totalAmount.toFixed(2)
          ] }) }),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: styles.checkoutButton,
              onClick: () => {
                isCartOpen.set(false);
                window.location.href = "/cart";
              },
              children: "Proceed to Checkout"
            }
          )
        ] })
      ] }) : /* @__PURE__ */ jsxs("div", { className: styles.emptyCart, children: [
        /* @__PURE__ */ jsx("p", { children: "Your cart is empty!" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => isCartOpen.set(false),
            className: styles.continueShopping,
            children: "Continue Shopping"
          }
        )
      ] })
    ] })
  ] });
}

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title = "Prime Wear - Collection of Primium Cloth",
    description = "This is a clothing brand ecommerce store"
  } = Astro2.props;
  return renderTemplate`<html lang="en" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><meta name="description"${addAttribute(description, "content")}><title>${title}</title>${renderComponent($$result, "ClientRouter", $$ClientRouter, { "data-astro-cid-sckkx6r4": true })}<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-..." crossorigin="anonymous" referrerpolicy="no-referrer">${renderHead()}</head> <body class="min-h-screen" data-astro-cid-sckkx6r4> <div class="" data-astro-cid-sckkx6r4> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-sckkx6r4": true })} ${renderComponent($$result, "Navbar", $$Navbar, { "data-astro-cid-sckkx6r4": true })} ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-sckkx6r4": true })} ${renderComponent($$result, "Copywrite", $$Copywrite, { "data-astro-cid-sckkx6r4": true })} </div> ${renderComponent($$result, "CartFlyout", CartFlyout, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Projects/astro-ecommerce/prime-wear/src/components/ui/CartFlyout", "client:component-export": "default", "data-astro-cid-sckkx6r4": true })}  </body></html>`;
}, "C:/Projects/astro-ecommerce/prime-wear/src/layouts/Layout.astro", void 0);

export { $$Layout as $, Button as B, clearCart as a, cn as b, createApiUrl as c, addToCart as d, isCartOpen as i };
