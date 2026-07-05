import type { ReactNode } from "react";

import {
  landingFrameClass,
  landingSectionClass,
  landingShellClass,
} from "@/lib/landing-layout";
import { cn } from "@/lib/utils";

type LandingSectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  frameClassName?: string;
};

export function LandingSection({
  id,
  children,
  className,
  frameClassName,
}: LandingSectionProps) {
  return (
    <section
      id={id}
      className={cn(landingSectionClass, id && "scroll-mt-16", className)}
    >
      <div className={landingShellClass}>
        <div className={cn(landingFrameClass, frameClassName)}>{children}</div>
      </div>
    </section>
  );
}
