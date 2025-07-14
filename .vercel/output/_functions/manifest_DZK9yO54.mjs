import 'kleur/colors';
import { f as decodeKey } from './chunks/astro/server_DH_zCuNi.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_GGjCxIeH.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Projects/astro-ecommerce/prime-wear/","cacheDir":"file:///C:/Projects/astro-ecommerce/prime-wear/node_modules/.astro/","outDir":"file:///C:/Projects/astro-ecommerce/prime-wear/dist/","srcDir":"file:///C:/Projects/astro-ecommerce/prime-wear/src/","publicDir":"file:///C:/Projects/astro-ecommerce/prime-wear/public/","buildClientDir":"file:///C:/Projects/astro-ecommerce/prime-wear/dist/client/","buildServerDir":"file:///C:/Projects/astro-ecommerce/prime-wear/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/cart.Dc3NIzBk.css"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"[data-astro-cid-h3zw4u6d]{scrollbar-width:thin;scrollbar-color:#e5e7eb transparent}::-webkit-scrollbar [data-astro-cid-h3zw4u6d]{width:6px}::-webkit-scrollbar-track [data-astro-cid-h3zw4u6d]{background:transparent}::-webkit-scrollbar-thumb [data-astro-cid-h3zw4u6d]{background-color:#e5e7eb;border-radius:3px}.space-y-2[data-astro-cid-h3zw4u6d]>div[data-astro-cid-h3zw4u6d],.space-y-2\\.5[data-astro-cid-h3zw4u6d]>div[data-astro-cid-h3zw4u6d]{position:relative}input[data-astro-cid-h3zw4u6d]:focus,textarea[data-astro-cid-h3zw4u6d]:focus,button[data-astro-cid-h3zw4u6d]:focus{outline:2px solid #3b82f6;outline-offset:2px}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}@media (max-width: 640px){.container[data-astro-cid-h3zw4u6d]{padding-left:8px;padding-right:8px}.text-lg[data-astro-cid-h3zw4u6d]{font-size:1rem}.text-xl[data-astro-cid-h3zw4u6d]{font-size:1.125rem}.py-3[data-astro-cid-h3zw4u6d]{padding-top:.5rem;padding-bottom:.5rem}.px-4[data-astro-cid-h3zw4u6d]{padding-left:.75rem;padding-right:.75rem}.h-9[data-astro-cid-h3zw4u6d]{height:2rem}.h-10[data-astro-cid-h3zw4u6d]{height:2.25rem}.px-2\\.5[data-astro-cid-h3zw4u6d]{padding-left:.5rem;padding-right:.5rem}.py-1\\.5[data-astro-cid-h3zw4u6d]{padding-top:.25rem;padding-bottom:.25rem}.min-h-\\[4\\.5rem\\][data-astro-cid-h3zw4u6d]{min-height:3.5rem}.min-h-\\[4rem\\][data-astro-cid-h3zw4u6d]{min-height:3rem}}\n"},{"type":"external","src":"/_astro/cart.Dc3NIzBk.css"}],"routeData":{"route":"/cart","isIndex":false,"type":"page","pattern":"^\\/cart\\/?$","segments":[[{"content":"cart","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/cart.astro","pathname":"/cart","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/cart.Dc3NIzBk.css"}],"routeData":{"route":"/categories/[slug]","isIndex":false,"type":"page","pattern":"^\\/categories\\/([^/]+?)\\/?$","segments":[[{"content":"categories","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/categories/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/order-success.aG-ZRBss.css"},{"type":"external","src":"/_astro/cart.Dc3NIzBk.css"}],"routeData":{"route":"/order-success","isIndex":false,"type":"page","pattern":"^\\/order-success\\/?$","segments":[[{"content":"order-success","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/order-success.astro","pathname":"/order-success","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".rich-content h1{font-size:1.5rem;font-weight:600;margin-top:1.5rem;margin-bottom:.75rem}.rich-content h2{font-size:1.25rem;font-weight:600;margin-top:1.5rem;margin-bottom:.75rem}.rich-content h3{font-size:1.125rem;font-weight:600;margin-top:1.5rem;margin-bottom:.75rem}.rich-content h4,.rich-content h5,.rich-content h6{font-size:1rem;font-weight:600;margin-top:1.5rem;margin-bottom:.75rem}.rich-content p{margin-bottom:1rem;line-height:1.6}.rich-content a{color:#06c;text-decoration:none}.rich-content a:hover{text-decoration:underline}.rich-content strong{font-weight:600}.rich-content em{font-style:italic}.rich-content u{text-decoration:underline}.rich-content s{text-decoration:line-through}.rich-content ul{list-style-type:disc;padding-left:1.5rem;margin-bottom:1rem;margin-top:1rem}.rich-content ol{list-style-type:decimal;padding-left:1.5rem;margin-bottom:1rem;margin-top:1rem}.rich-content li{margin-bottom:.25rem}.rich-content li p{margin-bottom:.5rem}.rich-content blockquote{border-left:4px solid #e5e7eb;padding-left:1rem;font-style:italic;margin:1rem 0;color:#4b5563}.rich-content code{background-color:#f3f4f6;padding:.125rem .25rem;border-radius:.25rem;font-size:.875em;color:#1f2937}.rich-content pre{background-color:#f3f4f6;padding:1rem;border-radius:.5rem;overflow-x:auto;margin:1rem 0}.rich-content pre code{background-color:transparent;padding:0;border-radius:0}.rich-content table{width:100%;border-collapse:collapse;margin:1rem 0}.rich-content th,.rich-content td{border:1px solid #e5e7eb;padding:.5rem}.rich-content th{background-color:#f9fafb}.rich-content hr{margin:1.5rem 0;border:0;border-top:1px solid #e5e7eb}.rich-content img{border-radius:.375rem;margin:1rem 0;max-width:100%;height:auto}.no-spinner[data-astro-cid-gpp6xnpz]::-webkit-outer-spin-button,.no-spinner[data-astro-cid-gpp6xnpz]::-webkit-inner-spin-button{-webkit-appearance:none}\n"},{"type":"external","src":"/_astro/cart.Dc3NIzBk.css"}],"routeData":{"route":"/products/[slug]","isIndex":false,"type":"page","pattern":"^\\/products\\/([^/]+?)\\/?$","segments":[[{"content":"products","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/products/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/cart.Dc3NIzBk.css"}],"routeData":{"route":"/shop","isIndex":true,"type":"page","pattern":"^\\/shop\\/?$","segments":[[{"content":"shop","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/shop/index.astro","pathname":"/shop","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/cart.Dc3NIzBk.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Projects/astro-ecommerce/prime-wear/src/pages/404.astro",{"propagation":"none","containsHead":true}],["C:/Projects/astro-ecommerce/prime-wear/src/pages/cart.astro",{"propagation":"none","containsHead":true}],["C:/Projects/astro-ecommerce/prime-wear/src/pages/categories/[slug].astro",{"propagation":"none","containsHead":true}],["C:/Projects/astro-ecommerce/prime-wear/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Projects/astro-ecommerce/prime-wear/src/pages/order-success.astro",{"propagation":"none","containsHead":true}],["C:/Projects/astro-ecommerce/prime-wear/src/pages/products/[slug].astro",{"propagation":"none","containsHead":true}],["C:/Projects/astro-ecommerce/prime-wear/src/pages/shop/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/categories/[slug]@_@astro":"pages/categories/_slug_.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:src/pages/order-success@_@astro":"pages/order-success.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/shop/index@_@astro":"pages/shop.astro.mjs","\u0000@astro-page:src/pages/products/[slug]@_@astro":"pages/products/_slug_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:src/pages/cart@_@astro":"pages/cart.astro.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","C:/Projects/astro-ecommerce/prime-wear/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_BVr1bOlM.mjs","\u0000@astrojs-manifest":"manifest_DZK9yO54.mjs","@/components/ShippingLocationSelector":"_astro/ShippingLocationSelector.Cfl_vwzJ.js","@/components/LocationSelector":"_astro/LocationSelector.DdW-drvO.js","C:/Projects/astro-ecommerce/prime-wear/src/components/OrderSuccessButtons":"_astro/OrderSuccessButtons.pyrgV73b.js","C:/Projects/astro-ecommerce/prime-wear/src/components/ui/CartFlyout":"_astro/CartFlyout.DZrsM6h7.js","C:/Projects/astro-ecommerce/prime-wear/src/components/SingleProductPage/CardAction":"_astro/CardAction.BnnTMbmm.js","C:/Projects/astro-ecommerce/prime-wear/src/components/ui/CartFlyoutIcon":"_astro/CartFlyoutIcon.BJ9q8a0S.js","C:/Projects/astro-ecommerce/prime-wear/src/components/ui/AddToCartButton":"_astro/AddToCartButton.Cgx55qxU.js","@astrojs/react/client.js":"_astro/client.BHhn6Sbv.js","C:/Projects/astro-ecommerce/prime-wear/src/pages/cart.astro?astro&type=script&index=0&lang.ts":"_astro/cart.astro_astro_type_script_index_0_lang.BYOCQT4k.js","C:/Projects/astro-ecommerce/prime-wear/src/pages/order-success.astro?astro&type=script&index=0&lang.ts":"_astro/order-success.astro_astro_type_script_index_0_lang.CvgMFpP5.js","C:/Projects/astro-ecommerce/prime-wear/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.CtSceO8m.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/cart.Dc3NIzBk.css","/_astro/order-success.aG-ZRBss.css","/favicon.ico","/logo.heif","/images/avatar.png","/images/banner-bg.jpg","/images/complete.png","/images/logo-white.svg","/images/logo.svg","/images/methods.png","/images/offer.jpg","/_astro/AddToCartButton.Cgx55qxU.js","/_astro/authentication.DqMf7FyG.js","/_astro/button.BgOG5uo_.js","/_astro/CardAction.BnnTMbmm.js","/_astro/cart.9e6f5f2b.CC5a_OFs.js","/_astro/cart.astro_astro_type_script_index_0_lang.BYOCQT4k.js","/_astro/cart.DfNaJd5E.css","/_astro/cart2.D96fcsPX.js","/_astro/CartFlyout.DZrsM6h7.js","/_astro/CartFlyoutIcon.BJ9q8a0S.js","/_astro/client.BHhn6Sbv.js","/_astro/ClientRouter.astro_astro_type_script_index_0_lang.CtSceO8m.js","/_astro/createLucideIcon.BRlJXQGF.js","/_astro/index.C7R7J_0t.js","/_astro/index.DfT8ewGw.js","/_astro/index.DH4MlOaT.js","/_astro/index.v2IxbOrn.js","/_astro/jsx-runtime.D_zvdyIk.js","/_astro/label.CnG6lw6_.js","/_astro/LocationSelector.DdW-drvO.js","/_astro/order-success.astro_astro_type_script_index_0_lang.CvgMFpP5.js","/_astro/OrderSuccessButtons.pyrgV73b.js","/_astro/ShippingLocationSelector.Cfl_vwzJ.js","/_astro/utils.CdyNXDGi.js","/images/category/category-1.jpg","/images/category/category-2.jpg","/images/category/category-3.jpg","/images/category/category-4.jpg","/images/category/category-5.jpg","/images/category/category-6.jpg","/images/favicon/about.txt","/images/favicon/android-chrome-192x192.png","/images/favicon/android-chrome-512x512.png","/images/favicon/apple-touch-icon.png","/images/favicon/favicon-16x16.png","/images/favicon/favicon-32x32.png","/images/favicon/favicon.ico","/images/favicon/site.webmanifest","/images/icons/bed-2.svg","/images/icons/bed.svg","/images/icons/delivery-van.svg","/images/icons/money-back.svg","/images/icons/office.svg","/images/icons/outdoor-cafe.svg","/images/icons/phone.svg","/images/icons/restaurant.svg","/images/icons/service-hours.svg","/images/icons/sofa.svg","/images/icons/terrace.svg","/images/products/product1.jpg","/images/products/product10.jpg","/images/products/product11.jpg","/images/products/product12.jpg","/images/products/product2.jpg","/images/products/product3.jpg","/images/products/product4.jpg","/images/products/product5.jpg","/images/products/product6.jpg","/images/products/product7.jpg","/images/products/product8.jpg","/images/products/product9.jpg"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"InHRiAl+SNQmgiIyrYls3NUDly3OUMjTH5SjlEEi6JU="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
