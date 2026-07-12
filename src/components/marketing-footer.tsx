import Link from "next/link";
import { Mail } from "lucide-react";

import { BrandLogo } from "@/components/brand-logo";
import { landingShellClass } from "@/lib/landing-layout";
import { brandLogoClass } from "@/lib/marketing-nav-layout";

const footerColumns = [
  {
    title: "Product",
    links: [
      { href: "/#features", label: "Features" },
      { href: "/type", label: "Typing focus" },
      { href: "/changelog", label: "Changelog" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "mailto:hello@meecanico.app", label: "Contact" },
      { href: "/attribution", label: "Attribution" },
    ],
  },
];

export function MarketingFooter() {
  return (
    <footer className="relative mt-auto border-t border-border/40 bg-background">
      <div className={`${landingShellClass} relative py-12 sm:py-14`}>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Link href="/" className={brandLogoClass}>
              <BrandLogo />
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Mechanical keyboard sounds for Mac.
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
                          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <Mail className="size-3.5" aria-hidden />
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

        <div className="mt-10 flex flex-col gap-2 border-t border-border/40 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>Copyright © 2026 Meecanico</span>
          <a
            href="https://ialdyksma.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            ialdyksma.dev
          </a>
        </div>
      </div>
    </footer>
  );
}
