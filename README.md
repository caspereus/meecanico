# Meecanico

Marketing website for [Meecanico](https://getmeecanico.com) — a free macOS menu bar app that plays mechanical keyboard sounds system-wide.

> **Note:** This repository contains the **website source only**. The native macOS app is distributed separately from [getmeecanico.com](https://getmeecanico.com).

## About

Meecanico turns any Mac keyboard into a mechanical one with 19 switch profiles, spatial audio, and zero keystroke logging. This repo powers the public landing page: hero, interactive typing playground, feature sections, changelog, and download CTAs.

## Features

- **Landing page** — Product story, features, and download calls-to-action
- **Interactive playground** — Try switch profiles and a live typing test in the browser
- **Changelog** — Release history driven by `src/data/changelog.ts`
- **Dark mode** — Theme-aware design tokens and components
- **Accessible UI** — Semantic markup, keyboard-friendly navigation, reduced-motion support

## Tech stack

| Layer | Tools |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| UI | [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/) (`base-nova`) |
| Icons | [Lucide](https://lucide.dev/) |
| Language | TypeScript |

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 20+
- npm (bundled with Node)

### Install and run

```bash
git clone git@github.com:caspereus/meecanico.git
cd meecanico
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
├── app/              # Next.js routes (home, changelog)
├── components/       # UI and marketing sections
│   ├── landing/      # Hero, playground, typing test
│   └── changelog/    # Changelog layout components
├── data/             # Static content (changelog releases)
├── hooks/            # Client hooks (typing test, scroll spy, etc.)
├── lib/              # Layout constants and utilities
└── styles/           # Shared transition styles
```

Design tokens live in `src/app/globals.css`. Layout and typography constants are in `src/lib/landing-layout.ts` and `src/lib/marketing-nav-layout.ts`.

## Documentation

Internal context docs for copy, brand, and design decisions:

| Doc | Purpose |
| --- | --- |
| [`LANDING_CONTEXT.md`](./LANDING_CONTEXT.md) | Product brief, copy, brand direction, site structure |
| [`DESIGN_CONTEXT.md`](./DESIGN_CONTEXT.md) | Visual design system, layout, components, tokens |

Keep these in sync when product features or branding change.

## Contributing

Contributions are welcome — bug fixes, copy improvements, accessibility tweaks, and UI polish.

1. Fork the repository and create a branch from `main`
2. Make your changes and run `npm run lint` and `npm run build`
3. Open a pull request with a clear description of what changed and why

For larger changes (new pages, layout overhauls), open an issue first so we can align on direction.

## Links

- **Website:** [getmeecanico.com](https://getmeecanico.com)
- **Contact:** [hello@meecanico.app](mailto:hello@meecanico.app)

## License

Copyright © 2026 Meecanico.
