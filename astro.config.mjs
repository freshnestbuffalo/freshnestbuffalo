// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://freshnestbuffalo.com',
  // build.format: 'file' outputs page-name.html (not page-name/index.html).
  // Cloudflare Pages automatically 308-redirects page-name.html -> /page-name
  // (no trailing slash). Removing 'file' would switch to directory output,
  // which Cloudflare instead redirects to /page-name/ (WITH a trailing
  // slash) -- the opposite of what we want. Keep 'file'.
  build: {
    format: 'file',
  },
  trailingSlash: 'never',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/thank-you'),
    }),
  ],
});
