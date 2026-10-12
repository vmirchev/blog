import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { satteri, satteriHeadingIdsPlugin } from "@astrojs/markdown-satteri";
import { headingLinks } from "./src/lib/heading-links.mjs";

export default defineConfig({
  site: "https://vmirchev.com",
  output: "static",
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: { theme: "github-dark" },
    processor: satteri({
      hastPlugins: [satteriHeadingIdsPlugin(), headingLinks],
    }),
  },
});
