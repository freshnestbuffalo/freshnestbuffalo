// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://freshnestbuffalo.com',
  // Keeps output as page-name.html instead of page-name/index.html,
  // so existing URLs like /sofa-cleaning-buffalo-ny.html keep working.
  build: {
    format: 'file',
  },
  trailingSlash: 'never',
});
