# Fresh Nest — Astro project

Static site for freshnestbuffalo.com, built with Astro. Same visual design,
content and SEO as the previous hand-written HTML — now as a maintainable
project instead of duplicated files.

## Project structure

```
src/
  layouts/
    Layout.astro          — shared <head> + <body> shell (nav, footer, sticky CTA, schema)
  components/
    Seo.astro              — title/description/canonical/OG/Twitter meta
    LocalBusinessSchema.astro — LocalBusiness+ProfessionalService JSON-LD (same on every page)
    Nav.astro               — header, root-relative links, works from any page
    Footer.astro
    StickyCta.astro         — mobile sticky Call Now / Get Estimate bar
    Cta.astro                — reusable button pair/trio (hero + final CTA)
    Faq.astro                — renders visible FAQ accordion AND FAQPage schema from one array
  pages/
    index.astro                     → /index.html  (homepage)
    sofa-cleaning-buffalo-ny.astro   → /sofa-cleaning-buffalo-ny.html, served by
                                       Cloudflare Pages at /sofa-cleaning-buffalo-ny
                                       (Cloudflare auto-redirects .html -> extensionless;
                                       this is why build.format stays 'file' in
                                       astro.config.mjs -- see comment there)
  styles/
    global.css              — entire site CSS, unchanged rules, only section backgrounds
                               moved from ID-selectors to .bg-white / .bg-tint utility classes
public/
  robots.txt, sitemap.xml, llms.txt   — copied as-is, not templated
  images/.gitkeep                      — placeholder, see "Before you deploy" below
.env.example                           — template for required environment variable
```

## Before you deploy — required manual steps

### 1. Copy your images

This project references `/images/logo.png`, `/images/owner.png`,
`/images/sofa.png`, `/images/chair.png`, `/images/mattress.png`,
`/images/car.png`, and the six `/images/chair1..3-before/after.jpg` files.
Copy them from your current Netlify site's `images/` folder into
`public/images/` here (delete the `.gitkeep` file, it's only there so Git
doesn't drop the empty folder). The build succeeds without them, but the
site will show broken images until they're added.

### 2. Set up the contact form (Formspree)

Netlify Forms does not work on Cloudflare Pages, so the form now posts to
[Formspree](https://formspree.io). The form ID is read from an environment
variable — it is **not** hardcoded in the source.

1. Create a free Formspree account and a form at formspree.io.
2. Copy `.env.example` to `.env` and set `PUBLIC_FORMSPREE_ID` to your form ID.
3. In Cloudflare Pages, set the same variable under **Settings → Environment
   variables** (see table below).

**Verified fact (checked in this session, July 2026, multiple independent
sources including Formspree's own docs):** Formspree's Free plan is capped
at 50 submissions/month and does **not** include file-upload storage at all
— the "Upload photos" field in this form will not work on the free plan.
File uploads require the Personal plan ($10–15/mo, 1GB storage, 200
submissions/month). If free file uploads matter more than staying on
Formspree, alternatives such as Web3Forms or Static Forms support file
uploads on their free tier — not implemented here, would need a separate
decision.

If `PUBLIC_FORMSPREE_ID` is left unset, the build still succeeds, but prints
a console warning during `npm run build` and the form's `action` attribute
will point to `https://formspree.io/f/` with no ID — submissions will fail
until it's set.

## Environment variables

| Variable | Required | Where to set it | Purpose |
|---|---|---|---|
| `PUBLIC_FORMSPREE_ID` | Yes, before the contact form works | `.env` locally, Cloudflare Pages → Settings → Environment variables (Production and Preview) | Formspree form ID used as the contact form's submit endpoint |

## Local development

```
npm install
npm run dev       # local dev server
npm run build     # production build into dist/
npm run preview   # preview the production build locally
```

## Deploy to Cloudflare Pages via GitHub

1. Push this project to a new GitHub repository.
2. In Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git
   → select the repository.
3. Build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Settings → Environment variables → add `PUBLIC_FORMSPREE_ID` (Production
   and Preview) as described above.
5. Deploy. Cloudflare rebuilds automatically on every push to the connected
   branch.
6. Domain management → add custom domain `freshnestbuffalo.com`, point DNS
   as instructed by Cloudflare.
