# Mecanico Design Context

Visual design reference extracted from **Ariva** (jadipns.com). Use this document when building the Mecanico personal side project to match the same look and feel.

---

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 App Router, React 19 |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"`, `@theme inline`) |
| Components | shadcn/ui, style `base-nova` |
| Primitives | `@base-ui/react` |
| Icons | `lucide-react` (do not use `Sparkles` in user-facing UI) |
| Animation | `tw-animate-css`, custom keyframes in `globals.css` |
| Utils | `clsx` + `tailwind-merge` via `cn()` |

### Key dependencies

```json
{
  "next": "16.x",
  "react": "19.x",
  "tailwindcss": "4.x",
  "@tailwindcss/postcss": "4.x",
  "shadcn": "4.x",
  "@base-ui/react": "1.x",
  "class-variance-authority": "0.7.x",
  "clsx": "2.x",
  "tailwind-merge": "3.x",
  "lucide-react": "1.x",
  "tw-animate-css": "1.x"
}
```

### shadcn config (`components.json`)

```json
{
  "style": "base-nova",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "iconLibrary": "lucide"
}
```

---

## Typography

### Font families

| Token | Font | Usage |
| --- | --- | --- |
| `font-sans` | Geist Sans | Body text, UI |
| `font-heading` | Geist Sans | Subheadings, card titles |
| `font-serif` | Figtree | Display headings (H1, H2) |
| `font-brand` | Figtree | Wordmark / logo |
| `font-mono` | Geist Mono | Code, technical labels |

### Next.js font setup

```tsx
import { Figtree, Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// <html className={`${geistSans.variable} ${figtree.variable} ${geistMono.variable} h-full antialiased`}>
```

### Type scale

| Element | Classes |
| --- | --- |
| Hero H1 | `font-serif text-4xl md:text-5xl xl:text-[3.25rem] font-semibold tracking-tight text-balance leading-tight` |
| Section H2 | `font-serif text-3xl sm:text-4xl xl:text-5xl font-semibold tracking-tight` |
| Subheading H3 | `font-heading text-base font-semibold text-foreground` |
| Body intro | `text-base sm:text-lg leading-relaxed text-muted-foreground` |
| Small body | `text-sm leading-relaxed text-muted-foreground` |
| Brand logo | `font-brand font-bold tracking-tight text-black text-xl sm:text-2xl` |
| Nav links | `text-xs font-medium` (desktop), `text-sm font-medium` (mobile) |
| Section label link | `text-sm md:text-base font-medium text-[#0A84FF]` |

---

## Color system

All colors use **oklch** CSS variables. Semantic tokens map to Tailwind utilities (`bg-background`, `text-muted-foreground`, etc.).

### Primary & brand

| Token | Value | Usage |
| --- | --- | --- |
| `--primary` | `blue-600` | Primary buttons, key actions |
| `--primary-foreground` | white | Text on primary |
| `--brand` | `khaki-600` | Intentional brand accent (sparingly) |
| `--brand-foreground` | cream neutral | Text on brand surfaces |
| Link accent | `#0A84FF` | Section labels, inline links, star ratings |
| `themeColor` | `#1E60FF` | Browser meta theme |

### Khaki palette (brand accent)

```
khaki-50:  oklch(0.97 0.015 72)
khaki-100: oklch(0.92 0.03 68)
khaki-200: oklch(0.87 0.04 68)
khaki-300: oklch(0.78 0.05 65)
khaki-400: oklch(0.68 0.065 62)
khaki-500: oklch(0.58 0.07 58)
khaki-600: oklch(0.48 0.065 52)  ← brand default
khaki-700: oklch(0.4 0.055 45)
khaki-800: oklch(0.32 0.04 42)
khaki-900: oklch(0.25 0.03 40)
```

### General neutrals (UI surfaces & typography)

```
general-50:  oklch(0.99 0 0)
general-100: oklch(0.97 0 0)
general-200: oklch(0.92 0 0)   ← borders, inputs
general-300: oklch(0.87 0 0)
general-400: oklch(0.72 0 0)   ← ring
general-500: oklch(0.56 0 0)   ← muted-foreground
general-600: oklch(0.44 0 0)
general-700: oklch(0.37 0 0)
general-800: oklch(0.27 0 0)
general-900: oklch(0.2 0 0)    ← foreground
```

### Semantic surfaces

| Token | Light mode |
| --- | --- |
| `--background` | `oklch(1 0 0)` (pure white) |
| `--foreground` | `general-900` |
| `--card` | white |
| `--muted` | `general-100` |
| `--muted-foreground` | `general-500` |
| `--border` | `general-200` |
| `--destructive` | `oklch(0.48 0.14 25)` |
| `--success` | `oklch(0.45 0.12 145)` |
| `--warning` | `oklch(0.72 0.14 75)` |

### Dark mode

Fully supported. Background shifts to `general-900`, primary becomes `blue-400`, brand becomes `khaki-400`. Borders use `oklch(1 0 0 / 10%)`.

### Mecanico palette swap (suggested)

Keep the token *structure*, replace khaki with your mechanic identity:

| Ariva | Mecanico (example) |
| --- | --- |
| `khaki-600` brand | `#E85D04` (workshop orange) or `#2B2D42` (steel) |
| Blue primary | Keep, or shift to teal `#0D9488` |
| Hero warm glow | Orange/amber instead of khaki |
| `#0A84FF` links | Keep or match new primary |

---

## Layout grid

### Core constants

```ts
// Shell (page container)
landingShellClass =
  "mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8";

// Section inner frame (the "framed column" signature)
landingFrameClass =
  "border-x border-border/40 px-5 py-12 sm:px-6 sm:py-14 md:px-8 md:py-16 lg:px-10 lg:py-20";

// Section wrapper
landingSectionClass =
  "mx-auto w-full border-b border-border/40 bg-background";

// Hero content area
landingHeroContentClass =
  "relative z-20 pb-24 pt-40 text-center sm:pb-28 sm:pt-44 md:pt-48 lg:pb-32 lg:pt-52 xl:pb-36";

// Nav
marketingNavInnerClass =
  "mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8";
```

### Visual signature: framed 1200px column

Every marketing section sits inside a centered 1200px shell with **vertical borders** (`border-x border-border/40`). Sections are separated by **horizontal borders** (`border-b border-border/40`). This creates a editorial, magazine-like column.

### Spacing rhythm

| Context | Padding |
| --- | --- |
| Section frame | `py-12` → `lg:py-20` |
| Hero | `pt-40` → `xl:pt-52`, `pb-24` → `xl:pb-36` |
| CTA section | `py-16 sm:py-20 md:py-24` |
| Footer | `py-12 sm:py-14` |
| Page below fixed nav | `pt-20 sm:pt-24` |

---

## Hero atmosphere

The hero is a layered composition. Reproduce all layers for the same feel.

### Layer 1: Base gradient

```css
/* Light */
background: linear-gradient(180deg, #f8fbff 0%, #ffffff 48%, #f6f0df 100%);

/* Dark */
background: linear-gradient(180deg, #08111f 0%, #101827 52%, #16130d 100%);
```

### Layer 2: Dotted glow background (canvas animation)

Animated blue dots with organic shimmer. Props:

```
opacity: 0.34
gap: 16
radius: 1.25
colorLightVar: --color-blue-300
glowColorLightVar: --color-blue-500
speedMin: 0.18, speedMax: 0.72
```

### Layer 3: Radial gradient overlays

```css
/* Light — blue top + khaki bottom-right */
radial-gradient(ellipse 120% 70% at 50% -10%, rgba(59,130,246,0.18), transparent 58%),
radial-gradient(ellipse 90% 48% at 82% 94%, rgba(168,145,89,0.16), transparent 62%),
linear-gradient(180deg, rgba(255,255,255,0.24), rgba(255,255,255,0.72) 68%, rgba(255,255,255,0.4))
```

### Layer 4: Bottom fade

```
absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background/80 to-transparent
```

### Reusable panel classes

```ts
landingHeroSurfaceClass =
  "bg-gradient-to-b from-sky-50 via-sky-50/50 to-white";

landingDreamyPanelClass =
  "bg-gradient-to-br from-sky-100/95 via-[#EBF4FF]/80 to-indigo-100/70";

landingPracticePanelClass =
  "bg-gradient-to-br from-violet-100/90 via-[#F3EEFF]/80 to-sky-100/65";

landingIllustrationStageClass =
  "relative overflow-hidden rounded-2xl border border-border/50 bg-neutral-50";

landingCtaSurfaceClass =
  "bg-gradient-to-b from-sky-50/40 to-background";
```

---

## Buttons

shadcn `base-nova` style with subtle 3D depth on primary.

### Variants

| Variant | Character |
| --- | --- |
| `default` | Blue radial gradient, inset white shadow, `shadow-md`, text shadow |
| `secondary` | Muted linear gradient, `border-zinc-300`, subtle shadow |
| `ghost` | Transparent, hover `bg-neutral-200` |
| `outline` | Border only, hover brighten |
| `destructive` | Red gradient with ring inset |

### Marketing CTA sizing

Override default `lg` for landing pages:

```
h-10 px-5 text-sm font-semibold
```

### Micro-interactions

```
active:scale-[0.97]
duration-150
transition: color, background, border, shadow, transform
```

### Typical CTA pairs

Hero and CTA sections use two buttons side by side:

```tsx
<div className="flex flex-wrap justify-center gap-3">
  <Button variant="default" size="lg">Primary action</Button>
  <Button variant="secondary" size="lg">Secondary action</Button>
</div>
```

---

## Section patterns

### 1. LandingSection (base wrapper)

```tsx
<section className="border-b border-border/40 bg-background">
  <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
    <div className="border-x border-border/40 px-5 py-12 lg:px-10 lg:py-20">
      {children}
    </div>
  </div>
</section>
```

### 2. Split product showcase

Text block + illustration in a dreamy panel. Optional `splitReverse` to flip layout.

```
[ Heading + intro paragraph ]
[ Section label link with ChevronRight ]
[ Highlight bullets ]
[ Illustration in landingDreamyPanelClass panel ]
```

### 3. Divider list (FAQs, catalogs, feature lists)

```tsx
<ul className="divide-y divide-border/60 border-y border-border/60">
  <li className="py-5 sm:py-6">...</li>
</ul>
```

### 4. Numbered steps

```tsx
<li className="flex gap-5">
  <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border/60 text-sm font-semibold">
    {step}
  </div>
  <div>
    <h3 className="font-heading text-base font-semibold">{title}</h3>
    <p className="mt-2 text-sm text-muted-foreground">{description}</p>
  </div>
</li>
```

### 5. Review / testimonial card

```tsx
<figure className="rounded-2xl border border-border/50 bg-muted/20 p-5">
  <blockquote className="text-sm leading-relaxed text-foreground">...</blockquote>
  <figcaption className="mt-4 text-sm text-muted-foreground">...</figcaption>
</figure>
```

### 6. CTA closing section

Centered heading + paragraph + two buttons on `landingCtaSurfaceClass` gradient.

---

## Navigation

### Structure

- Fixed top, `z-40`, white background
- Height: `h-16` (64px)
- On scroll: `bg-white backdrop-blur-xl` with border
- Logo left, nav links center (desktop), auth CTAs right
- Mobile: hamburger → full-width dropdown

### Link styles

```ts
desktop: "rounded-md px-2.5 py-1.5 text-xs font-medium hover:bg-muted/60"
mobile:  "rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted/60"
active:  "bg-muted font-semibold"
```

### Dropdown menus

```
rounded-lg border border-border/60 bg-background/95 p-1 shadow-lg backdrop-blur-xl
```

### Auth buttons (right side)

```
Ghost "Masuk" (hidden on xs) + Primary "Daftar"
h-9 px-3 text-xs
```

---

## Footer

### Surface

```
border-t border-border/40
bg-gradient-to-b from-muted/25 to-background
```

### Decoration layers

1. Dot grid: 20px radial dots, 22% opacity, masked fade to bottom
2. Blue blur orb: `size-80 bg-blue-200/20 blur-3xl` bottom-left
3. Khaki blur orb: `size-64 bg-khaki-200/25 blur-3xl` top-right
4. Top edge: `h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent`

### Layout

- Brand block: logo + tagline + social icons
- 5-column link grid (collapses to 2-col on mobile)
- Copyright strip with `border-t border-border/40`

### Footer link style

```
text-sm text-muted-foreground hover:text-foreground
```

---

## Cards & surfaces

### Card (shadcn)

```
rounded-xl bg-card ring-1 ring-foreground/10
text-sm [--card-spacing:--spacing(4)]
```

### Feature panels

```
rounded-2xl border border-border/50
```

### Hover states

```
hover:bg-muted/30     (list rows)
hover:bg-muted/60     (nav links)
```

### Border opacity convention

- Structural borders: `border-border/40`
- List dividers: `border-border/60`
- Soft panels: `border-border/50`

---

## Border radius

| Token | Value |
| --- | --- |
| `--radius` (base) | `0.625rem` (10px) |
| `--radius-sm` | `calc(var(--radius) * 0.6)` |
| `--radius-md` | `calc(var(--radius) * 0.8)` |
| `--radius-lg` | `var(--radius)` |
| `--radius-xl` | `calc(var(--radius) * 1.4)` |
| `--radius-2xl` | `calc(var(--radius) * 1.8)` |

Usage: buttons `rounded-lg`, cards `rounded-xl`, panels/reviews `rounded-2xl`.

---

## Motion & animation

### Custom keyframes (`globals.css`)

| Class | Effect | Duration |
| --- | --- | --- |
| `.illustration-float` | translateY -6px bounce | 5s ease-in-out infinite |
| `.illustration-glow` | opacity 0.35 → 0.65 | 6s ease-in-out infinite |
| `.illustration-progress` | brightness 1 → 1.12 | 3s ease-in-out infinite |
| `.trust-strip-marquee` | translateX -50% | 32s linear infinite |

### Interaction

- Button press: `active:scale-[0.97]`
- Nav dropdown: `opacity + translateY` 150ms
- Nav background: `transition 300ms` on scroll

### Accessibility

```css
@media (prefers-reduced-motion: reduce) {
  .trust-strip-marquee { animation: none; }
}
```

---

## Page structure template

```tsx
<div className="flex min-h-screen flex-col bg-background">
  <MarketingNav />

  <main className="flex flex-1 flex-col">
    <LandingHeroSection />
    <LandingTrustStrip />          {/* optional */}
    <LandingSection>...</LandingSection>
    <LandingProductShowcase />     {/* optional, repeatable */}
    <LandingCtaSection />
  </main>

  <MarketingFooter />
</div>
```

---

## Mecanico adaptation checklist

- [ ] Scaffold Next.js 16 + Tailwind v4 + shadcn (`base-nova`)
- [ ] Copy `globals.css` token structure; swap khaki → Mecanico accent
- [ ] Set up Geist + Figtree fonts in root layout
- [ ] Add layout constants (`landingShellClass`, `landingFrameClass`, heading classes)
- [ ] Build `MarketingNav` + `LandingSection` + `MarketingFooter` shell
- [ ] Hero with gradient layers + optional dotted glow
- [ ] Port button variants from shadcn `base-nova`
- [ ] Replace product illustrations with Mecanico-specific mockups
- [ ] Update `themeColor` and OG image
- [ ] Define Mecanico copy tone (separate from Ariva's Bahasa Indonesia rules)

---

## Source files (Ariva reference)

| Concern | Path |
| --- | --- |
| Color tokens | `src/app/globals.css` |
| Layout constants | `src/lib/landing-layout.ts` |
| Nav layout | `src/lib/marketing-nav-layout.ts` |
| Hero | `src/components/landing/landing-hero-section.tsx` |
| Atmosphere | `src/components/landing/landing-atmosphere.tsx` |
| Section wrapper | `src/components/landing/landing-section.tsx` |
| Page composition | `src/components/landing-page.tsx` |
| Navigation | `src/components/marketing-nav.tsx` |
| Footer | `src/components/marketing-footer.tsx` |
| Buttons | `src/components/ui/button.tsx` |
| Cards | `src/components/ui/card.tsx` |
| Dotted glow | `src/components/ui/dotted-glow-background.tsx` |
| Fonts | `src/app/layout.tsx` |
