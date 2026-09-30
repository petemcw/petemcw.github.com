// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://petemcw.com',
  trailingSlash: 'ignore',
  integrations: [mdx()],
  markdown: {
    shikiConfig: { theme: 'monokai' },
  },
});
