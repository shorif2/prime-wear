import { c as createComponent, a as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_DH_zCuNi.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_BnXPpko-.mjs';
export { renderers } from '../../renderers.mjs';

const $$slug = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Prime Ware", "description": "This is product deatils pages" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div>categories</div> ` })}`;
}, "C:/Projects/astro-ecommerce/prime-wear/src/pages/categories/[slug].astro", void 0);

const $$file = "C:/Projects/astro-ecommerce/prime-wear/src/pages/categories/[slug].astro";
const $$url = "/categories/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
