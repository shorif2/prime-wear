import { c as createComponent, b as createAstro, m as maybeRenderHead, d as addAttribute, a as renderComponent, r as renderTemplate } from './astro/server_DH_zCuNi.mjs';
import 'kleur/colors';
import { jsxs, jsx } from 'react/jsx-runtime';

function AddToCartButton({
  product,
  quantity = 1,
  className = ""
}) {
  const handleAddToCart = () => {
  };
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick: handleAddToCart,
      className: `bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors ${className}`,
      children: [
        /* @__PURE__ */ jsx("i", { className: "fa-solid fa-cart-plus mr-2" }),
        "Add to Cart"
      ]
    }
  );
}

const $$Astro = createAstro();
const $$ProductCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ProductCard;
  const { product } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="bg-white shadow rounded overflow-hidden group"> <div class="relative"> <img${addAttribute(product?.imageUrl, "src")} alt="product 1" class="w-full"> <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center
                    justify-center gap-2 opacity-0 group-hover:opacity-100 transition"> <a${addAttribute(`/products/${product?.slug}`, "href")} class="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition" title="view product"> <i class="fa-solid fa-magnifying-glass"></i> </a> <a href="#" class="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition" title="add to wishlist"> <i class="fa-solid fa-heart"></i> </a> </div> </div> <div class="pt-4 pb-3 px-4"> <a${addAttribute(`/products/${product?.slug}`, "href")}> <h4 class="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition"> ${product?.name} </h4> </a> <div class="flex items-baseline mb-1 space-x-2"> <p class="text-xl text-primary font-semibold">
$${product?.price} </p> <p class="text-sm text-gray-400 line-through">
$${product?.discountedPrice} </p> </div> <div class="flex items-center"> <div class="flex gap-1 text-sm text-yellow-400"> <span> <i class="fa-solid fa-star"></i> </span> <span> <i class="fa-solid fa-star"></i> </span> <span> <i class="fa-solid fa-star"></i> </span> <span> <i class="fa-solid fa-star"></i> </span> <span> <i class="fa-solid fa-star"></i> </span> </div> <div class="text-xs text-gray-500 ml-3">(150)</div> </div> </div> ${renderComponent($$result, "AddToCartButton", AddToCartButton, { "product": {
    id: product?.id,
    name: product?.name,
    price: product?.price,
    imageSrc: product?.imageUrl,
    slug: product?.slug
  }, "className": "block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition", "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Projects/astro-ecommerce/prime-wear/src/components/ui/AddToCartButton", "client:component-export": "default" })} </div>`;
}, "C:/Projects/astro-ecommerce/prime-wear/src/components/HomeComponents/ProductCard.astro", void 0);

export { $$ProductCard as $ };
