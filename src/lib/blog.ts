import { getCollection, type CollectionEntry } from "astro:content";

export type BlogPost = CollectionEntry<"blog">;

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function readingMinutes(post: BlogPost): number {
  const words =
    post.body
      ?.replace(/[#*`>\[\](){}]/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean).length ?? 0;
  return Math.max(1, Math.ceil(words / 220));
}

export function formatDate(date: Date, precision: "day" | "month" = "day"): string {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    ...(precision === "day" ? { day: "numeric" } : {}),
    timeZone: "UTC",
  }).format(date);
}
