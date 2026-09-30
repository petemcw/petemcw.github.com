# petemcw.github.io

It's my website, built with [Astro](https://astro.build/) and deployed to GitHub Pages by GitHub Actions.

## Run it locally

Requires Node 22.12 or newer (see `.nvmrc`).

```bash
git clone git@github.com:petemcw/petemcw.github.com.git
cd petemcw.github.com/
npm install
npm run dev
```

## Write a post

Add a Markdown file to `src/content/posts/` named `YYYY-MM-DD-slug.md`. It's published at `/YYYY/slug/`. Front matter fields are defined in `src/content.config.ts`. Recipes add a `recipe:` block. Use `.mdx` when a post needs components such as `<GoogleDrivePlayer />`.

Posts with `hidden: true` are built and linked from tags, categories, and the feed, but left off the home page.

## Publish a new version

Push to the `source` branch. The [deploy workflow](.github/workflows/deploy.yml) builds the site and publishes it to GitHub Pages. Pull requests against `source` get a build check without deploying.

Static files that skip the build (images, fonts, `CNAME`, `robots.txt`, and the self-contained `/memorial/` page) live in `public/`.

## Upgrade Astro

```bash
npx @astrojs/upgrade
```

---

### Copyright and license

Theme by [Josh Gerdes](https://github.com/joshgerdes/). It is under [the MIT license](/LICENSE).
