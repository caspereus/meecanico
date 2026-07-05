"use client";

import type { ReactNode } from "react";

import { Button } from "@/components/optics/button";
import { marketingButtonClass } from "@/lib/landing-layout";
import { scrollToSection } from "@/lib/scroll-to-section";
import { cn } from "@/lib/utils";

type SectionAnchorButtonProps = {
  sectionId: string;
  children: ReactNode;
  className?: string;
  variant?: "default" | "secondary";
};

export function SectionAnchorButton({
  sectionId,
  children,
  className,
  variant = "default",
}: SectionAnchorButtonProps) {
  return (
    <Button
      type="button"
      variant={variant}
      className={cn(marketingButtonClass, className)}
      onClick={() => scrollToSection(sectionId)}
    >
      {children}
    </Button>
  );
}
