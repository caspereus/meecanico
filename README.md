# Meecanico — Marketing Website

Landing site repo for [Meecanico](https://getmeecanico.com), a native macOS menu bar app that plays mechanical keyboard sounds system-wide.

## Context

| Doc | Purpose |
| --- | --- |
| [`LANDING_CONTEXT.md`](./LANDING_CONTEXT.md) | Product brief, copy, brand direction, site structure |
| [`DESIGN_CONTEXT.md`](./DESIGN_CONTEXT.md) | Visual design system (Ariva-derived), layout, components, tokens |

## Status

Next.js 16 scaffold is in place with Tailwind v4, shadcn/ui (`base-nova`), and the marketing landing shell.

```bash
npm run dev    # http://localhost:3000
npm run build
```

### What's included

- Design tokens in `src/app/globals.css` (Mecanico orange brand accent, blue primary, dark mode)
- Geist + Figtree fonts in `src/app/layout.tsx`
- Layout constants in `src/lib/landing-layout.ts` and `src/lib/marketing-nav-layout.ts`
- Shell components: `MarketingNav`, `LandingHeroSection`, `LandingSection`, `MarketingFooter`
- Starter home page wired in `src/components/landing-page.tsx`

### Next steps

See the checklist in [`DESIGN_CONTEXT.md`](./DESIGN_CONTEXT.md) and [`LANDING_CONTEXT.md`](./LANDING_CONTEXT.md) for remaining pages (`/download`, `/privacy`, switch showcase, OG image, etc.).
