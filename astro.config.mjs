// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import netlify from "@astrojs/netlify";
import { imageConfig } from "./src/lib/image-config.js";
import vercel from "@astrojs/vercel";
// Import Tailwind CSS Vite plugin directly
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: "server",
  // adapter: netlify(),
  // adapter: vercel({
  //   // @ts-ignore - Type definitions might be outdated, documentation indicates this is valid
  //   // Create a separate Vercel function for each route
  //   functionPerRoute: true,
  //   // You might want to enable web analytics or other Vercel features here too
  //   // webAnalytics: { enabled: true },
  // }),
  adapter: netlify(),

  image: imageConfig,

  vite: {
    plugins: [tailwindcss()],
  },
});
