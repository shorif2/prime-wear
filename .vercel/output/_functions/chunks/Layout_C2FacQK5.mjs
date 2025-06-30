import { c as createComponent, m as maybeRenderHead, r as renderTemplate, a as renderComponent, b as createAstro, d as addAttribute, g as renderScript, h as renderHead, i as renderSlot } from './astro/server_BTOzv46n.mjs';
import 'kleur/colors';
import 'clsx';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { Popover, Transition } from '@headlessui/react';
import 'react';
import { useStore } from '@nanostores/react';
import { atom } from 'nanostores';
/* empty css                         */

const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<nav class="bg-gray-800"> <div class="container flex"> <div class="px-8 py-4 bg-primary md:flex items-center cursor-pointer relative group hidden"> <span class="text-white"> <i class="fa-solid fa-bars"></i> </span> <span class="capitalize ml-2 text-white hidden">All Categories</span> <!-- dropdown --> <div class="absolute left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible w-[600px]" style="width: 300px;"> <a href="#" class="flex items-center px-6 py-3 hover:bg-gray-100 transition"> <img src="/images/icons/sofa.svg" alt="sofa" class="w-5 h-5 object-contain"> <span class="ml-6 text-gray-600 text-sm">Sofa</span> </a> <a href="#" class="flex items-center px-6 py-3 hover:bg-gray-100 transition"> <img src="/images/icons/terrace.svg" alt="terrace" class="w-5 h-5 object-contain"> <span class="ml-6 text-gray-600 text-sm">Living Room</span> </a> <a href="#" class="flex items-center px-6 py-3 hover:bg-gray-100 transition"> <img src="/images/icons/bed.svg" alt="bed" class="w-5 h-5 object-contain"> <span class="ml-6 text-gray-600 text-sm">Bedroom</span> </a> <a href="#" class="flex items-center px-6 py-3 hover:bg-gray-100 transition"> <img src="/images/icons/office.svg" alt="Outdoor" class="w-5 h-5 object-contain"> <span class="ml-6 text-gray-600 text-sm">Outdoor</span> </a> <a href="#" class="flex items-center px-6 py-3 hover:bg-gray-100 transition"> <img src="/images/icons/outdoor-cafe.svg" alt="outdoor" class="w-5 h-5 object-contain"> <span class="ml-6 text-gray-600 text-sm">Outdoor</span> </a> <a href="#" class="flex items-center px-6 py-3 hover:bg-gray-100 transition"> <img src="/images/icons/bed-2.svg" alt="Mattress" class="w-5 h-5 object-contain"> <span class="ml-6 text-gray-600 text-sm">Mattress</span> </a> </div> </div> <div class="flex items-center justify-between flex-grow md:pl-12 py-5"> <div class="flex items-center space-x-6 capitalize"> <a href="/" class="text-gray-200 hover:text-white transition">Home</a> <a href="/shop" class="text-gray-200 hover:text-white transition">Shop</a> <a href="#" class="text-gray-200 hover:text-white transition">About us</a> <a href="#" class="text-gray-200 hover:text-white transition">Contact us</a> </div> <a href="/login" class="text-gray-200 hover:text-white transition">Login</a> </div> </div> </nav>`;
}, "C:/Projects/Scalius/prime-wear/src/components/Navbar.astro", void 0);

const isCartOpen = atom(false);
function closeCart() {
  isCartOpen.set(false);
}

const CartIcon = () => {
  const $isCartOpen = useStore(isCartOpen);
  return /* @__PURE__ */ jsx("div", { className: "ml-4 flow-root lg:ml-6", children: /* @__PURE__ */ jsx(Popover, { children: ({ close }) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      Popover.Button,
      {
        onClick: () => isCartOpen.set(true),
        className: "group -m-2 flex items-center p-2 text-2xl",
        children: [
          /* @__PURE__ */ jsx("i", { className: "fa-solid fa-bag-shopping " }),
          /* @__PURE__ */ jsx("span", { className: "ml-2 text-sm font-medium", children: "0" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "items in cart, view bag" })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      Transition,
      {
        show: $isCartOpen,
        enter: "transition ease-out duration-200",
        enterFrom: "opacity-0 translate-y-1",
        enterTo: "opacity-100 translate-y-0",
        leave: "transition ease-in duration-150",
        leaveFrom: "opacity-100 translate-y-0",
        leaveTo: "opacity-0 translate-y-1",
        children: /* @__PURE__ */ jsx(Popover.Panel, { className: "absolute right-0 z-10 mt-5 flex w-screen max-w-max -mr-2 ", children: /* @__PURE__ */ jsxs("div", { className: "relative w-screen max-w-md min-h-96 flex-auto overflow-hidden rounded bg-white border shadow-lg ring-1 ring-gray-900/5", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-2 right-2", children: /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => {
                closeCart();
                close();
              },
              className: "text-gray-400 hover:text-gray-600",
              children: [
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" }),
                /* @__PURE__ */ jsx("i", { className: "fa-solid fa-xmark text-xl pr-4" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsx("ul", { className: "p-4", children: /* @__PURE__ */ jsx("p", { className: "text-center text-gray-500", children: "No product added to cart yet." }) })
        ] }) })
      }
    )
  ] }) }) });
};

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header class="py-4 shadow-sm bg-white"> <div class="container flex items-center justify-between"> <a href="index.html"> <img src="/logo.heif" alt="Logo" class="w-32"> </a> <div class="w-full max-w-xl relative flex"> <span class="absolute left-4 top-3 text-lg text-gray-400"> <i class="fa-solid fa-magnifying-glass"></i> </span> <input type="text" name="search" id="search" class="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none hidden md:flex" placeholder="search"> <button class="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition hidden md:flex justify-center items-center">Search</button> </div> <div class="flex justify-end items-end space-x-4"> ${renderComponent($$result, "CartIcon", CartIcon, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Projects/Scalius/prime-wear/src/components/CartIcon", "client:component-export": "default" })} </div> <!-- account --> </div> </header>`;
}, "C:/Projects/Scalius/prime-wear/src/components/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="bg-white pt-16 pb-12 border-t border-gray-100"> <div class="container grid grid-cols-1"> <div class="col-span-1 space-y-4"> <img src="/logo.heif" alt="logo" class="w-30"> <div class="mr-2"> <p class="text-gray-500">
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
}, "C:/Projects/Scalius/prime-wear/src/components/Footer.astro", void 0);

const $$Copywrite = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="bg-gray-800 py-4"> <div class="container flex items-center justify-between"> <p class="text-white">&copy; Scalius - All Right Reserved</p> <div> <img src="/images/methods.png" alt="methods" class="h-5"> </div> </div> </div>`;
}, "C:/Projects/Scalius/prime-wear/src/components/Copywrite.astro", void 0);

const $$Astro$1 = createAstro();
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "C:/Projects/Scalius/prime-wear/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Projects/Scalius/prime-wear/node_modules/astro/components/ClientRouter.astro", void 0);

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title = "Prime Wear - Collection of Primium Cloth",
    description = "This is a clothing brand ecommerce store"
  } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><meta name="description"${addAttribute(description, "content")}><title>${title}</title>${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-..." crossorigin="anonymous" referrerpolicy="no-referrer">${renderHead()}</head> <body class="min-h-screen"> ${renderComponent($$result, "Header", $$Header, {})} ${renderComponent($$result, "Navbar", $$Navbar, {})} ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Footer", $$Footer, {})} ${renderComponent($$result, "Copywrite", $$Copywrite, {})} </body></html>`;
}, "C:/Projects/Scalius/prime-wear/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
