# 2026 Pool &amp; Spa Digital Marketing Playbook — Landing Page

A redesigned landing page for the Compass Digital 2026 Pool &amp; Spa Digital Marketing Playbook, rebuilt to match the current [getcompassdigital.com](https://getcompassdigital.com/) homepage design language.

## What's here

- `public/index.html` — the full landing page (semantic, single file)
- `public/assets/css/styles.css` — design system and layout
- `public/assets/js/main.js` — sticky header, mobile nav, scroll reveals, mobile CTA
- `public/assets/img/` — brand logo and favicon
- `wrangler.jsonc` — Cloudflare Workers static assets deployment config

## Design language

Pulled from the live homepage:

| Token | Value |
| --- | --- |
| Serif (headings) | PT Serif |
| Sans (body) | Manrope |
| Orange (accent / CTA) | `#FAA948` |
| Slate blue | `#5B7A8F` |
| Cream (surfaces) | `#F5F5F4` |
| Gray | `#CFCBCA` |

## Run locally

It's a static site. Open `public/index.html` directly, or serve it:

```bash
python3 -m http.server 8080 --directory public
# then visit http://localhost:8080
```

## Form wiring

The signup area embeds the live Gravity Form at
`https://getcompassdigital.com/playbook-form/?nowprocket=1`. Submissions are
handled by WordPress / Gravity Forms and the connected ActiveCampaign feed.

## Deploy to Cloudflare

This repo is configured for Cloudflare Workers static assets. Use:

```bash
npx wrangler deploy
```

The `wrangler.jsonc` file defines the Worker name and asset directory so
Cloudflare's build environment can deploy non-interactively.

## Content source

Copy adapted from the existing
[2026 Pool &amp; Spa Digital Marketing Playbook page](https://getcompassdigital.com/pool-and-spa-digital-marketing-playbook-2026/).
