import { DownloadCtaButton } from "@/components/download-cta-button";
import { SectionAnchorButton } from "@/components/section-anchor-button";
import {
  heroHeadingClass,
  heroIntroClass,
  landingHeroContentClass,
  landingShellClass,
} from "@/lib/landing-layout";
import { marketingNavHeightClass } from "@/lib/marketing-nav-layout";

export function LandingHeroSection() {
  return (
    <section className="relative border-b border-border/40 bg-background">
      <div className={`${landingShellClass} relative`}>
        <div className="border-x border-border/40">
          <div aria-hidden className={marketingNavHeightClass} />
          <div className={landingHeroContentClass}>
            <h1 className={heroHeadingClass}>
              Your Mac keyboard, finally mechanical.
            </h1>
            <p className={`mx-auto mt-6 max-w-2xl sm:mt-8 ${heroIntroClass}`}>
              Mechanical switch sounds in every app. 19 profiles to choose from.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 sm:mt-10">
              <DownloadCtaButton source="hero" />
              <SectionAnchorButton sectionId="try" variant="secondary">
                Try it
              </SectionAnchorButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
