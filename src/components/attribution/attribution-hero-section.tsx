import {
  heroHeadingClass,
  heroIntroClass,
  landingHeroContentClass,
  landingShellClass,
} from "@/lib/landing-layout";
import { marketingNavHeightClass } from "@/lib/marketing-nav-layout";

export function AttributionHeroSection() {
  return (
    <section className="relative border-b border-border/40 bg-background">
      <div className={`${landingShellClass} relative`}>
        <div className="border-x border-border/40">
          <div aria-hidden className={marketingNavHeightClass} />
          <div className={landingHeroContentClass}>
            <h1 className={heroHeadingClass}>Attribution</h1>
            <p className={`mx-auto mt-8 max-w-2xl sm:mt-10 ${heroIntroClass}`}>
              Credits for open-source and community work used on this site.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
