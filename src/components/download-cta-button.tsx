"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";

import { AppleIcon } from "@/components/apple-icon";
import { Button } from "@/components/optics/button";
import { currentRelease } from "@/data/release";
import {
  marketingButtonClass,
  marketingNavButtonClass,
} from "@/lib/landing-layout";
import { cn } from "@/lib/utils";

export const downloadCtaLabel = "Download for Mac";

export type DownloadClickSource =
  | "hero"
  | "nav"
  | "cta"
  | "changelog-hero"
  | "changelog-sidebar";

type DownloadCtaButtonProps = {
  className?: string;
  nav?: boolean;
  source: DownloadClickSource;
  onClick?: () => void;
};

function trackDownloadClick(source: DownloadClickSource) {
  track("Download Click", {
    source,
    version: currentRelease.version,
  });
}

export function DownloadCtaButton({
  className,
  nav = false,
  source,
  onClick,
}: DownloadCtaButtonProps) {
  return (
    <Button
      render={<Link href="/download" />}
      nativeButton={false}
      aria-label={downloadCtaLabel}
      className={cn(
        nav ? marketingNavButtonClass : marketingButtonClass,
        nav && "max-sm:shrink",
        className
      )}
      onClick={() => {
        trackDownloadClick(source);
        onClick?.();
      }}
    >
      <AppleIcon className="size-4 shrink-0" aria-hidden />
      <span className="hidden sm:inline">{downloadCtaLabel}</span>
      <span className="sm:hidden">Download</span>
    </Button>
  );
}
