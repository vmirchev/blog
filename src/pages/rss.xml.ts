import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { site } from "../config/site";
import { getPublishedPosts } from "../lib/blog";

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();
  return rss({
    title: `${site.name} — Writing`,
    description:
      "Notes on software engineering, systems design, and machine learning.",
    site: site.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id}/`,
    })),
  });
};
