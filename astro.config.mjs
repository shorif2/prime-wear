// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";

import tailwindcss from "@tailwindcss/vite";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: "server",
  adapter: netlify(),
  vite: {
    plugins: [tailwindcss()],
  },
});