import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_C0mWa9f5.mjs';
import { manifest } from './manifest_DZK9yO54.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/cart.astro.mjs');
const _page3 = () => import('./pages/categories/_slug_.astro.mjs');
const _page4 = () => import('./pages/order-success.astro.mjs');
const _page5 = () => import('./pages/products/_slug_.astro.mjs');
const _page6 = () => import('./pages/shop.astro.mjs');
const _page7 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/cart.astro", _page2],
    ["src/pages/categories/[slug].astro", _page3],
    ["src/pages/order-success.astro", _page4],
    ["src/pages/products/[slug].astro", _page5],
    ["src/pages/shop/index.astro", _page6],
    ["src/pages/index.astro", _page7]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "2054784d-4102-4bb8-9d45-37bc9add623f",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
