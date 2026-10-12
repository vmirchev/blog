# Personal website

This is a personal website at [vmirchev.com](https://vmirchev.com). It introduces my work as a software engineer, highlights selected projects, and collects writing about software development and machine learning.

This repository contains the source for the site. It is built with Astro and TypeScript, with blog posts written in Markdown and MDX. The site builds to static files in `dist/`; GitHub Actions checks the build and deploys it over SFTP when changes reach the default branch.

To run it locally:

```bash
npm ci
npm run dev
```
