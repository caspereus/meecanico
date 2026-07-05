"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  brandLogoClass,
  marketingNavInnerClass,
  marketingNavLinkDesktopClass,
  marketingNavLinkMobileClass,
} from "@/lib/marketing-nav-layout";

const navLinks = [
  { href: "/#try", label: "Try it" },
  { href: "/#features", label: "Features" },
  { href: "/#switches", label: "Switches" },
  { href: "/#privacy", label: "Privacy" },
];

export function MarketingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background,border-color] duration-300",
        scrolled
          ? "border-b border-border/40 bg-background/95 backdrop-blur-xl"
          : "bg-background"
      )}
    >
      <div className={marketingNavInnerClass}>
        <Link href="/" className={brandLogoClass}>
          Meecanico
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={marketingNavLinkDesktopClass}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/changelog"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "h-9 px-3 text-xs"
            )}
          >
            Changelog
          </Link>
          <Link
            href="/download"
            className={cn(buttonVariants({ size: "sm" }), "h-9 px-3 text-xs")}
          >
            Download
          </Link>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {mobileOpen ? (
        <nav
          className="border-t border-border/40 bg-background/95 px-4 py-3 backdrop-blur-xl md:hidden"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn("block", marketingNavLinkMobileClass)}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 flex flex-col gap-2 border-t border-border/40 pt-3">
              <Link
                href="/changelog"
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "w-full justify-start"
                )}
                onClick={() => setMobileOpen(false)}
              >
                Changelog
              </Link>
              <Link
                href="/download"
                className={cn(buttonVariants(), "w-full")}
                onClick={() => setMobileOpen(false)}
              >
                Download for macOS
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
