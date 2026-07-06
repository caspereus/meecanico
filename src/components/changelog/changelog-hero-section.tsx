import { DownloadCtaButton } from "@/components/download-cta-button";
import {
  heroHeadingClass,
  heroIntroClass,
  landingHeroContentClass,
  landingShellClass,
} from "@/lib/landing-layout";
import { marketingNavHeightClass } from "@/lib/marketing-nav-layout";

export function ChangelogHeroSection() {
  return (
    <section className="relative border-b border-border/40 bg-background">
      <div className={`${landingShellClass} relative`}>
        <div className="border-x border-border/40">
          <div aria-hidden className={marketingNavHeightClass} />
          <div className={landingHeroContentClass}>
            <h1 className={heroHeadingClass}>Changelog</h1>
            <p className={`mx-auto mt-8 max-w-2xl sm:mt-10 ${heroIntroClass}`}>
              Version history and release notes for Meecanico on macOS.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3 sm:mt-12">
              <DownloadCtaButton source="changelog-hero" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
