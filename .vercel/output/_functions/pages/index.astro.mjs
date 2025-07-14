import { c as createComponent, m as maybeRenderHead, r as renderTemplate, a as renderComponent, F as Fragment, d as addAttribute, b as createAstro } from '../chunks/astro/server_DH_zCuNi.mjs';
import 'kleur/colors';
import 'clsx';
import { a as getAllCategories, b as getCollectionById } from '../chunks/dataFetching_CkgelruV.mjs';
import { $ as $$ProductCard } from '../chunks/ProductCard_DZYeKYxw.mjs';
import { $ as $$Layout } from '../chunks/Layout_BnXPpko-.mjs';
import '../chunks/cart.9e6f5f2b_DNfEmW5v.mjs';
export { renderers } from '../renderers.mjs';

const $$Ads = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"> <a href="#"> <img src="/images/offer.jpg" alt="ads" class="w-full"> </a> </div>`;
}, "C:/Projects/astro-ecommerce/prime-wear/src/components/HomeComponents/Ads.astro", void 0);

const $$Banner = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="banner" class="bg-cover bg-no-repeat bg-center py-36" style="background-image: url('/images/banner-bg.jpg');" data-astro-cid-tdtgwdtx> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-astro-cid-tdtgwdtx> <h1 class="text-6xl text-gray-800 font-medium mb-4 capitalize" data-astro-cid-tdtgwdtx>
best collection for <br data-astro-cid-tdtgwdtx> home decoration
</h1> <p data-astro-cid-tdtgwdtx>
Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam <br data-astro-cid-tdtgwdtx>
accusantium perspiciatis, sapiente magni eos dolorum ex quos dolores odio
</p> <div class="mt-12" data-astro-cid-tdtgwdtx> <a href="#" class="bg-primary border border-primary text-white px-8 py-3 font-medium
                    rounded-md hover:bg-transparent hover:text-primary" data-astro-cid-tdtgwdtx>Shop Now</a> </div> </div> </div> `;
}, "C:/Projects/astro-ecommerce/prime-wear/src/components/HomeComponents/Banner.astro", void 0);

const $$Categories = createComponent(async ($$result, $$props, $$slots) => {
  const categoriesData = await getAllCategories();
  const categories = categoriesData?.categories || [];
  return renderTemplate`${maybeRenderHead()}<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"> <h2 class="text-2xl font-medium text-gray-800 uppercase mb-6">
shop by category
</h2> <div class="grid grid-cols-8 gap-3"> ${categories?.map((category) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "key": category.id }, { "default": async ($$result2) => renderTemplate` <a${addAttribute(`/categories/${category?.slug}`, "href")} class="border flex flex-col justify-center items-center py-2 px-3 text-sm space-y-2 rounded-xl"> <img class="w-12"${addAttribute(category?.imageUrl, "src")} alt="Skincare & Beauty"> <div class="wgt-h4k2m9-title">${category?.name}</div> </a> ` })}`)} </div> </div>`;
}, "C:/Projects/astro-ecommerce/prime-wear/src/components/HomeComponents/Categories.astro", void 0);

const $$Features = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"> <div class="w-10/12 grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto justify-center"> <div class="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5"> <img src="/images/icons/delivery-van.svg" alt="Delivery" class="w-12 h-12 object-contain"> <div> <h4 class="font-medium capitalize text-lg">Free Shipping</h4> <p class="text-gray-500 text-sm">Order over $200</p> </div> </div> <div class="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5"> <img src="/images/icons/money-back.svg" alt="Delivery" class="w-12 h-12 object-contain"> <div> <h4 class="font-medium capitalize text-lg">Money Rturns</h4> <p class="text-gray-500 text-sm">30 days money returs</p> </div> </div> <div class="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5"> <img src="/images/icons/service-hours.svg" alt="Delivery" class="w-12 h-12 object-contain"> <div> <h4 class="font-medium capitalize text-lg">24/7 Support</h4> <p class="text-gray-500 text-sm">Customer support</p> </div> </div> </div> </div>`;
}, "C:/Projects/astro-ecommerce/prime-wear/src/components/HomeComponents/Features.astro", void 0);

const $$Newarrival = createComponent(async ($$result, $$props, $$slots) => {
  const collection = await getCollectionById("OLDTd9h9LLr6Ofcor10mZ");
  const products = collection?.products;
  return renderTemplate`${maybeRenderHead()}<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"> <h2 class="text-2xl font-medium text-gray-800 uppercase mb-6">
top new arrival
</h2> <div class="grid grid-cols-1 md:grid-cols-4 gap-6"> ${products?.map((product) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "key": product.id }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "ProductCard", $$ProductCard, { "product": product })} ` })}`)} </div> </div>`;
}, "C:/Projects/astro-ecommerce/prime-wear/src/components/HomeComponents/Newarrival.astro", void 0);

const $$Product = createComponent(async ($$result, $$props, $$slots) => {
  const collection = await getCollectionById("awjozLK92GIUPLIwVvBU-");
  let products = collection?.products;
  if (!products || products.length === 0) {
    products = [
      {
        id: "sample-1",
        name: "Premium Cotton T-Shirt",
        price: 29.99,
        discountedPrice: 24.99,
        discountPercentage: 16.67,
        slug: "premium-cotton-tshirt",
        imageUrl: "/images/products/product1.jpg"
      },
      {
        id: "sample-2",
        name: "Denim Jacket",
        price: 89.99,
        discountedPrice: 79.99,
        discountPercentage: 11.11,
        slug: "denim-jacket",
        imageUrl: "/images/products/product2.jpg"
      },
      {
        id: "sample-3",
        name: "Casual Sneakers",
        price: 59.99,
        discountedPrice: 49.99,
        discountPercentage: 16.67,
        slug: "casual-sneakers",
        imageUrl: "/images/products/product3.jpg"
      },
      {
        id: "sample-4",
        name: "Wool Sweater",
        price: 69.99,
        discountedPrice: 59.99,
        discountPercentage: 14.29,
        slug: "wool-sweater",
        imageUrl: "/images/products/product4.jpg"
      }
    ];
  }
  return renderTemplate`${maybeRenderHead()}<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"> <h2 class="text-2xl font-medium text-gray-800 uppercase mb-6">
TRENDING PRODUCTS
</h2> <div class="grid grid-cols-2 md:grid-cols-4 gap-6"> ${products?.map((product) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "key": product.id }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "ProductCard", $$ProductCard, { "product": product })} ` })}`)} </div> </div>`;
}, "C:/Projects/astro-ecommerce/prime-wear/src/components/HomeComponents/Product.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Prime Wear - Collection of Primium Cloth", ",": true, "description": "This is a clothing brand ecommerce store" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Banner", $$Banner, {})} ${renderComponent($$result2, "Features", $$Features, {})} ${renderComponent($$result2, "Categories", $$Categories, {})} ${renderComponent($$result2, "Newarrival", $$Newarrival, {})} ${renderComponent($$result2, "Ads", $$Ads, {})} ${renderComponent($$result2, "Product", $$Product, {})} ` })}`;
}, "C:/Projects/astro-ecommerce/prime-wear/src/pages/index.astro", void 0);

const $$file = "C:/Projects/astro-ecommerce/prime-wear/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
