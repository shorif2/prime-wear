import { c as createComponent, b as createAstro, m as maybeRenderHead, a as renderComponent, r as renderTemplate, d as addAttribute, F as Fragment$1 } from '../../chunks/astro/server_BTOzv46n.mjs';
import 'kleur/colors';
import { $ as $$Breadcrumb } from '../../chunks/Breadcrumb_Y53Emyab.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { c as cn, $ as $$ProductCard, g as getProductBySlug } from '../../chunks/dataFetching_D5g0dRSW.mjs';
/* empty css                                     */
import { useState } from 'react';
import { a as addCartItem, $ as $$Layout } from '../../chunks/Layout_DpZArtzS.mjs';
export { renderers } from '../../renderers.mjs';

function RichContent({
  content,
  className,
  variant = "default"
}) {
  if (!content) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "prose max-w-none rich-content",
        // Base styling
        "prose-headings:font-semibold prose-headings:mb-3 prose-headings:mt-6",
        "prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg",
        "prose-h4:text-base prose-h5:text-sm prose-h6:text-sm",
        "prose-p:leading-relaxed prose-p:mb-4",
        "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
        "prose-strong:font-semibold",
        "prose-em:italic",
        "prose-u:underline",
        "prose-s:line-through",
        // List styling
        "prose-ul:pl-5 prose-ol:pl-5",
        "prose-ul:list-disc prose-ol:list-decimal",
        "prose-li:mb-1 prose-li:pl-1",
        // Image styling
        "prose-img:rounded-md",
        "prose-hr:my-6",
        // Table styling
        "prose-table:border-collapse prose-table:w-full",
        "prose-th:border prose-th:border-gray-300 prose-th:p-2 prose-th:bg-gray-100",
        "prose-td:border prose-td:border-gray-300 prose-td:p-2",
        // Code styling
        "prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-gray-800 prose-code:text-sm",
        "prose-pre:bg-gray-100 prose-pre:p-4 prose-pre:rounded-md prose-pre:overflow-x-auto",
        "prose-pre:code:bg-transparent prose-pre:code:p-0",
        // Blockquote styling
        "prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:my-4 prose-blockquote:text-gray-700",
        // Variant-specific styling
        variant === "default" && "prose-sm md:prose-base",
        variant === "compact" && "prose-xs md:prose-sm",
        variant === "product" && [
          "prose-sm md:prose-base",
          "prose-headings:text-gray-900",
          "prose-p:text-gray-700",
          "prose-a:text-primary",
          "prose-img:my-4",
          "prose-ul:text-gray-700 prose-ol:text-gray-700",
          "prose-li:text-gray-700",
          "prose-code:text-gray-800",
          "prose-blockquote:text-gray-700"
        ],
        className
      ),
      dangerouslySetInnerHTML: { __html: content }
    }
  );
}

const $$Astro$3 = createAstro();
const $$Description = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Description;
  const { description } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="container pb-16"> <h3 class="border-b border-gray-200 font-roboto text-gray-800 pb-3 font-medium">
Product details
</h3> <div class="w-3/5 pt-6"> <div class="text-gray-600"> ${description && renderTemplate`${renderComponent($$result, "RichContent", RichContent, { "content": description })}`} </div> </div> </div>`;
}, "C:/Projects/Scalius/prime-wear/src/components/SingleProductPage/Description.astro", void 0);

const CardAction = () => {
  const [inputNumber, setInputNumber] = useState(1);
  const increaseQuantity = () => {
    setInputNumber((prev) => prev + 1);
  };
  const decreaseQuantity = () => {
    setInputNumber((prev) => prev > 1 ? prev - 1 : 1);
  };
  const handleInputChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setInputNumber(value);
  };
  const handleAddToCart = (number) => {
    addCartItem(number);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-sm text-gray-800 uppercase mb-1", children: "Quantity" }),
      /* @__PURE__ */ jsx("label", { htmlFor: "quantity", className: "sr-only", children: "Product quantity" }),
      /* @__PURE__ */ jsxs("div", { className: "flex text-gray-600 divide-x divide-gray-300 w-max", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            id: "quantity-minus",
            onClick: decreaseQuantity,
            className: "h-8 w-8 border border-gray-300 text-xl flex items-center justify-center cursor-pointer select-none",
            "aria-label": "Decrease quantity",
            children: "-"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            id: "quantity",
            name: "quantity",
            min: 1,
            value: inputNumber,
            onChange: handleInputChange,
            "aria-label": "Product quantity",
            className: "h-8 w-10 text-center text-base flex items-center justify-center no-spinner"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            id: "quantity-plus",
            onClick: increaseQuantity,
            className: "h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none border border-gray-300",
            "aria-label": "Increase quantity",
            children: "+"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => handleAddToCart(inputNumber),
          className: "bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition",
          children: [
            /* @__PURE__ */ jsx("i", { className: "fa-solid fa-bag-shopping" }),
            " Add to cart"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "#",
          className: "border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition",
          children: [
            /* @__PURE__ */ jsx("i", { className: "fa-solid fa-heart" }),
            " Wishlist"
          ]
        }
      )
    ] })
  ] });
};

const $$Astro$2 = createAstro();
const $$ProductDetail = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ProductDetail;
  const productData = Astro2.props.productData;
  const { product, category, images, variants, relatedProducts } = productData || {};
  const { name, price, metaDescription, discountedPrice } = product;
  return renderTemplate`${maybeRenderHead()}<main class="container grid grid-cols-2 gap-6" data-astro-cid-gpp6xnpz> <div data-astro-cid-gpp6xnpz> <img${addAttribute(images[0].url, "src")} alt="product" class="w-full" data-astro-cid-gpp6xnpz> <div class="grid grid-cols-5 gap-4 mt-4" data-astro-cid-gpp6xnpz> ${images?.map((image) => renderTemplate`${renderComponent($$result, "Fragment", Fragment$1, { "key": image.id }, { "default": ($$result2) => renderTemplate` <img${addAttribute(image.url, "src")} alt="product2" class="w-full cursor-pointer border border-primary" data-astro-cid-gpp6xnpz> ` })}`)} </div> </div> <div data-astro-cid-gpp6xnpz> <h2 class="text-3xl font-medium uppercase mb-2" data-astro-cid-gpp6xnpz>${name}</h2> <div class="flex items-center mb-4" data-astro-cid-gpp6xnpz> <div class="flex gap-1 text-sm text-yellow-400" data-astro-cid-gpp6xnpz> <span data-astro-cid-gpp6xnpz><i class="fa-solid fa-star" data-astro-cid-gpp6xnpz></i></span> <span data-astro-cid-gpp6xnpz><i class="fa-solid fa-star" data-astro-cid-gpp6xnpz></i></span> <span data-astro-cid-gpp6xnpz><i class="fa-solid fa-star" data-astro-cid-gpp6xnpz></i></span> <span data-astro-cid-gpp6xnpz><i class="fa-solid fa-star" data-astro-cid-gpp6xnpz></i></span> <span data-astro-cid-gpp6xnpz><i class="fa-solid fa-star" data-astro-cid-gpp6xnpz></i></span> </div> <div class="text-xs text-gray-500 ml-3" data-astro-cid-gpp6xnpz>(150 Reviews)</div> </div> <div class="space-y-2" data-astro-cid-gpp6xnpz> <p class="text-gray-800 font-semibold space-x-2" data-astro-cid-gpp6xnpz> <span data-astro-cid-gpp6xnpz>Availability: </span> <span class="text-green-600" data-astro-cid-gpp6xnpz>In Stock</span> </p> <p class="space-x-2" data-astro-cid-gpp6xnpz> <span class="text-gray-800 font-semibold" data-astro-cid-gpp6xnpz>Brand: </span> <span class="text-gray-600" data-astro-cid-gpp6xnpz>Apex</span> </p> <p class="space-x-2" data-astro-cid-gpp6xnpz> <span class="text-gray-800 font-semibold" data-astro-cid-gpp6xnpz>Category: </span> <span class="text-gray-600" data-astro-cid-gpp6xnpz>${category?.name}</span> </p> <p class="space-x-2" data-astro-cid-gpp6xnpz> <span class="text-gray-800 font-semibold" data-astro-cid-gpp6xnpz>SKU: </span> <span class="text-gray-600" data-astro-cid-gpp6xnpz>BE45VGRT</span> </p> </div> <div class="flex items-baseline mb-1 space-x-2 font-roboto mt-4" data-astro-cid-gpp6xnpz> <p class="text-xl text-primary font-semibold" data-astro-cid-gpp6xnpz>$${discountedPrice}</p> <p class="text-base text-gray-400 line-through" data-astro-cid-gpp6xnpz>$${price}</p> </div> <p class="mt-4 text-gray-600" data-astro-cid-gpp6xnpz>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos eius eum
      reprehenderit dolore vel mollitia optio consequatur hic asperiores
      inventore suscipit, velit consequuntur, voluptate doloremque iure
      necessitatibus adipisci magnam porro.
</p> ${renderComponent($$result, "CardAction", CardAction, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Projects/Scalius/prime-wear/src/components/SingleProductPage/CardAction", "client:component-export": "default", "data-astro-cid-gpp6xnpz": true })} <!-- social icon --> <div class="flex gap-3 mt-4" data-astro-cid-gpp6xnpz> <a href="#" class="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center" data-astro-cid-gpp6xnpz> <i class="fa-brands fa-facebook-f" data-astro-cid-gpp6xnpz></i> </a> <a href="#" class="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center" data-astro-cid-gpp6xnpz> <i class="fa-brands fa-twitter" data-astro-cid-gpp6xnpz></i> </a> <a href="#" class="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center" data-astro-cid-gpp6xnpz> <i class="fa-brands fa-instagram" data-astro-cid-gpp6xnpz></i> </a> </div> </div> </main> `;
}, "C:/Projects/Scalius/prime-wear/src/components/SingleProductPage/ProductDetail.astro", void 0);

const $$Astro$1 = createAstro();
const $$RelatedProduct = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$RelatedProduct;
  const { relatedProducts } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="container pb-16"> <h2 class="text-2xl font-medium text-gray-800 uppercase mb-6">
Related products
</h2> <div class="grid grid-cols-4 gap-6"> ${relatedProducts?.map((product) => renderTemplate`${renderComponent($$result, "Fragment", Fragment$1, { "key": product.id, "class": "" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ProductCard", $$ProductCard, { "product": product })} ` })}`)} </div> </div>`;
}, "C:/Projects/Scalius/prime-wear/src/components/SingleProductPage/RelatedProduct.astro", void 0);

const $$Astro = createAstro();
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  console.log(slug);
  if (!slug) {
    return Astro2.redirect("/404");
  }
  const productData = await getProductBySlug(slug);
  if (!productData) {
    return Astro2.redirect("/404");
  }
  const { product, relatedProducts } = productData;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Prime Ware", "description": "This is product deatils pages" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Breadcrumb", $$Breadcrumb, {})} ${renderComponent($$result2, "ProductDetail", $$ProductDetail, { "productData": productData })} ${renderComponent($$result2, "Description", $$Description, { "description": product?.description })} ${renderComponent($$result2, "RelatedProduct", $$RelatedProduct, { "relatedProducts": relatedProducts })} ` })}`;
}, "C:/Projects/Scalius/prime-wear/src/pages/products/[slug].astro", void 0);

const $$file = "C:/Projects/Scalius/prime-wear/src/pages/products/[slug].astro";
const $$url = "/products/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
