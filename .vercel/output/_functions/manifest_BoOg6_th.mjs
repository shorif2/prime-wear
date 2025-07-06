import 'kleur/colors';
import { e as decodeKey } from './chunks/astro/server_BTOzv46n.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_BqA20RVj.mjs';
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

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Projects/Scalius/prime-wear/","cacheDir":"file:///C:/Projects/Scalius/prime-wear/node_modules/.astro/","outDir":"file:///C:/Projects/Scalius/prime-wear/dist/","srcDir":"file:///C:/Projects/Scalius/prime-wear/src/","publicDir":"file:///C:/Projects/Scalius/prime-wear/public/","buildClientDir":"file:///C:/Projects/Scalius/prime-wear/dist/client/","buildServerDir":"file:///C:/Projects/Scalius/prime-wear/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.VlHSIBq8.css"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".rich-content h1{font-size:1.5rem;font-weight:600;margin-top:1.5rem;margin-bottom:.75rem}.rich-content h2{font-size:1.25rem;font-weight:600;margin-top:1.5rem;margin-bottom:.75rem}.rich-content h3{font-size:1.125rem;font-weight:600;margin-top:1.5rem;margin-bottom:.75rem}.rich-content h4,.rich-content h5,.rich-content h6{font-size:1rem;font-weight:600;margin-top:1.5rem;margin-bottom:.75rem}.rich-content p{margin-bottom:1rem;line-height:1.6}.rich-content a{color:#06c;text-decoration:none}.rich-content a:hover{text-decoration:underline}.rich-content strong{font-weight:600}.rich-content em{font-style:italic}.rich-content u{text-decoration:underline}.rich-content s{text-decoration:line-through}.rich-content ul{list-style-type:disc;padding-left:1.5rem;margin-bottom:1rem;margin-top:1rem}.rich-content ol{list-style-type:decimal;padding-left:1.5rem;margin-bottom:1rem;margin-top:1rem}.rich-content li{margin-bottom:.25rem}.rich-content li p{margin-bottom:.5rem}.rich-content blockquote{border-left:4px solid #e5e7eb;padding-left:1rem;font-style:italic;margin:1rem 0;color:#4b5563}.rich-content code{background-color:#f3f4f6;padding:.125rem .25rem;border-radius:.25rem;font-size:.875em;color:#1f2937}.rich-content pre{background-color:#f3f4f6;padding:1rem;border-radius:.5rem;overflow-x:auto;margin:1rem 0}.rich-content pre code{background-color:transparent;padding:0;border-radius:0}.rich-content table{width:100%;border-collapse:collapse;margin:1rem 0}.rich-content th,.rich-content td{border:1px solid #e5e7eb;padding:.5rem}.rich-content th{background-color:#f9fafb}.rich-content hr{margin:1.5rem 0;border:0;border-top:1px solid #e5e7eb}.rich-content img{border-radius:.375rem;margin:1rem 0;max-width:100%;height:auto}.no-spinner[data-astro-cid-gpp6xnpz]::-webkit-outer-spin-button,.no-spinner[data-astro-cid-gpp6xnpz]::-webkit-inner-spin-button{-webkit-appearance:none}\n"},{"type":"external","src":"/_astro/index.VlHSIBq8.css"}],"routeData":{"route":"/products/[slug]","isIndex":false,"type":"page","pattern":"^\\/products\\/([^/]+?)\\/?$","segments":[[{"content":"products","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/products/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.VlHSIBq8.css"}],"routeData":{"route":"/shop","isIndex":true,"type":"page","pattern":"^\\/shop\\/?$","segments":[[{"content":"shop","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/shop/index.astro","pathname":"/shop","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.VlHSIBq8.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Projects/Scalius/prime-wear/src/pages/404.astro",{"propagation":"none","containsHead":true}],["C:/Projects/Scalius/prime-wear/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Projects/Scalius/prime-wear/src/pages/products/[slug].astro",{"propagation":"none","containsHead":true}],["C:/Projects/Scalius/prime-wear/src/pages/shop/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/shop/index@_@astro":"pages/shop.astro.mjs","\u0000@astro-page:src/pages/products/[slug]@_@astro":"pages/products/_slug_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","C:/Projects/Scalius/prime-wear/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DvXlxNUh.mjs","\u0000@astrojs-manifest":"manifest_BoOg6_th.mjs","C:/Projects/Scalius/prime-wear/src/components/ui/CartFlyout":"_astro/CartFlyout.CwQOJ2a9.js","C:/Projects/Scalius/prime-wear/src/components/SingleProductPage/CardAction":"_astro/CardAction.D61sahli.js","C:/Projects/Scalius/prime-wear/src/components/ui/CartFlyoutIcon":"_astro/CartFlyoutIcon.CCoP0bXN.js","@astrojs/react/client.js":"_astro/client.BPIbHqJh.js","C:/Projects/Scalius/prime-wear/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.CtSceO8m.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/index.VlHSIBq8.css","/favicon.svg","/logo.heif","/images/avatar.png","/images/banner-bg.jpg","/images/complete.png","/images/logo-white.svg","/images/logo.svg","/images/methods.png","/images/offer.jpg","/_astro/CardAction.D61sahli.js","/_astro/cart.NSnv6F-5.js","/_astro/CartFlyout.CwQOJ2a9.js","/_astro/CartFlyoutIcon.CCoP0bXN.js","/_astro/client.BPIbHqJh.js","/_astro/ClientRouter.astro_astro_type_script_index_0_lang.CtSceO8m.js","/_astro/index.BhVZPXkr.css","/_astro/index.BirL68QC.js","/_astro/index.BVOCwoKb.js","/_astro/index.c78c9bfc.DBMkI9BB.js","/images/category/category-1.jpg","/images/category/category-2.jpg","/images/category/category-3.jpg","/images/category/category-4.jpg","/images/category/category-5.jpg","/images/category/category-6.jpg","/images/favicon/about.txt","/images/favicon/android-chrome-192x192.png","/images/favicon/android-chrome-512x512.png","/images/favicon/apple-touch-icon.png","/images/favicon/favicon-16x16.png","/images/favicon/favicon-32x32.png","/images/favicon/favicon.ico","/images/favicon/site.webmanifest","/images/products/product1.jpg","/images/products/product10.jpg","/images/products/product11.jpg","/images/products/product12.jpg","/images/products/product2.jpg","/images/products/product3.jpg","/images/products/product4.jpg","/images/products/product5.jpg","/images/products/product6.jpg","/images/products/product7.jpg","/images/products/product8.jpg","/images/products/product9.jpg","/images/icons/bed-2.svg","/images/icons/bed.svg","/images/icons/delivery-van.svg","/images/icons/money-back.svg","/images/icons/office.svg","/images/icons/outdoor-cafe.svg","/images/icons/phone.svg","/images/icons/restaurant.svg","/images/icons/service-hours.svg","/images/icons/sofa.svg","/images/icons/terrace.svg"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"+Cn6oa1evP0LQ3q5KG4SbyQIVeO+a/A6rtb1LZ22NpU="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
