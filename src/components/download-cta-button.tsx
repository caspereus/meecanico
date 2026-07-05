import Link from "next/link";

import { AppleIcon } from "@/components/apple-icon";
import { Button } from "@/components/optics/button";
import {
  marketingButtonClass,
  marketingNavButtonClass,
} from "@/lib/landing-layout";
import { cn } from "@/lib/utils";

export const downloadCtaLabel = "Download for Mac";

type DownloadCtaButtonProps = {
  className?: string;
  nav?: boolean;
  onClick?: () => void;
};

export function DownloadCtaButton({
  className,
  nav = false,
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
      onClick={onClick}
    >
      <AppleIcon className="size-4 shrink-0" aria-hidden />
      <span className="hidden sm:inline">{downloadCtaLabel}</span>
      <span className="sm:hidden">Download</span>
    </Button>
  );
}
