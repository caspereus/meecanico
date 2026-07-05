"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { BrandLogo } from "@/components/brand-logo";
import { DownloadCtaButton } from "@/components/download-cta-button";
import { Button } from "@/components/optics/button";
import { marketingNavButtonClass } from "@/lib/landing-layout";
import { cn } from "@/lib/utils";
import {
  brandLogoClass,
  marketingNavFrameClass,
  marketingNavInnerClass,
  marketingNavShellClass,
} from "@/lib/marketing-nav-layout";

export function MarketingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className={marketingNavShellClass}>
        <div
          className={cn(
            marketingNavFrameClass,
            scrolled
              ? "border-b border-border/40 bg-background/90 backdrop-blur-xl"
              : "bg-background/70 backdrop-blur-md"
          )}
        >
          <div className={marketingNavInnerClass}>
            <Link href="/" className={cn(brandLogoClass, "min-w-0 shrink")}>
              <BrandLogo />
            </Link>

            <div className="flex shrink-0 items-center gap-1 sm:gap-2">
              <Button
                render={<Link href="/changelog" />}
                nativeButton={false}
                variant="ghost"
                className={cn(marketingNavButtonClass, "hidden sm:inline-flex")}
              >
                Changelog
              </Button>
              <DownloadCtaButton nav />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
