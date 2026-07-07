# 2026 Pool &amp; Spa Digital Marketing Playbook — Landing Page

A redesigned landing page for the Compass Digital 2026 Pool &amp; Spa Digital Marketing Playbook, rebuilt to match the current [getcompassdigital.com](https://getcompassdigital.com/) homepage design language.

## What's here

- `index.html` — the full landing page (semantic, single file)
- `assets/css/styles.css` — design system and layout
- `assets/js/main.js` — sticky header, mobile nav, scroll reveals, form handling
- `assets/img/` — brand logo and favicon

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

It's a static site. Open `index.html` directly, or serve it:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Form wiring

The signup form (`#playbookForm`) currently runs a front-end demo handler that
validates fields and shows a success state. Wire the `submit` handler in
`assets/js/main.js` to your CRM / form endpoint (e.g. HubSpot) to capture leads.

## Content source

Copy adapted from the existing
[2026 Pool &amp; Spa Digital Marketing Playbook page](https://getcompassdigital.com/pool-and-spa-digital-marketing-playbook-2026/).
