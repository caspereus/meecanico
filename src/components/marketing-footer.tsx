import Link from "next/link";

import { landingShellClass } from "@/lib/landing-layout";
import { brandLogoClass } from "@/lib/marketing-nav-layout";

const footerColumns = [
  {
    title: "Product",
    links: [
      { href: "/#features", label: "Features" },
      { href: "/changelog", label: "Changelog" },
    ],
  },
  {
    title: "Support",
    links: [{ href: "mailto:hello@meecanico.app", label: "Contact" }],
  },
];

export function MarketingFooter() {
  return (
    <footer className="relative mt-auto border-t border-border/40 bg-gradient-to-b from-muted/25 to-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.06)_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.22] [mask-image:linear-gradient(to_bottom,black,transparent)] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 size-80 rounded-full bg-blue-200/20 blur-3xl dark:bg-blue-500/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 size-64 rounded-full bg-brand-200/25 blur-3xl dark:bg-brand-500/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
      />

      <div className={`${landingShellClass} relative py-12 sm:py-14`}>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Link href="/" className={brandLogoClass}>
              Meecanico
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Native macOS menu bar app that makes any keyboard sound mechanical
              — with 19 switch profiles, 3D spatial audio, and zero keystroke
              logging.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="font-heading text-sm font-semibold text-foreground">
                  {column.title}
                </h3>
                <ul className="mt-3 space-y-2">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith("mailto:") ? (
                        <a
                          href={link.href}
                          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-border/40 pt-6 text-sm text-muted-foreground">
          Copyright © 2026 Meecanico
        </div>
      </div>
    </footer>
  );
}
