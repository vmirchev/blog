const name = import.meta.env.SITE_NAME?.trim() || "Portfolio Owner";
const email = import.meta.env.SITE_EMAIL?.trim() || "hello@example.invalid";

export const site = {
  name,
  title: `${name} — Software Engineer & Machine Learning`,
  description:
    "Software engineer with 15+ years of production development experience, currently focused on machine learning engineering and end-to-end ML systems.",
  url: import.meta.env.SITE!,
  github: "https://github.com/vmirchev",
  linkedin: "https://www.linkedin.com/in/velimir-mirchev-13002542/",
  email,
} as const;
