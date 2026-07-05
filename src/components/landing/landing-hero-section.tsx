import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LandingAtmosphere } from "@/components/landing/landing-atmosphere";
import {
  bodyIntroClass,
  heroHeadingClass,
  landingHeroContentClass,
  landingShellClass,
} from "@/lib/landing-layout";

export function LandingHeroSection() {
  return (
    <section className="relative border-b border-border/40">
      <LandingAtmosphere />
      <div className={landingShellClass}>
        <div className="border-x border-border/40">
          <div className={landingHeroContentClass}>
            <p className="mb-4 text-sm font-medium text-muted-foreground">
              Free · macOS 14+ · No account required
            </p>
            <h1 className={heroHeadingClass}>
              Your Mac keyboard, finally mechanical.
            </h1>
            <p className={`mx-auto mt-5 max-w-2xl ${bodyIntroClass}`}>
              Meecanico plays low-latency switch sounds everywhere you type —
              with 19 profiles, 3D spatial audio, and zero keystroke logging.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/download"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-10 px-5 text-sm font-semibold active:scale-[0.97]"
                )}
              >
                Download for macOS
              </Link>
              <Link
                href="/#try"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" }),
                  "h-10 px-5 text-sm font-semibold active:scale-[0.97]"
                )}
              >
                Try it live
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
