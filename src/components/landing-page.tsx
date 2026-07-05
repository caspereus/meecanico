import {
  AudioLines,
  PanelTop,
  ShieldCheck,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";

import { HashScrollHandler } from "@/components/hash-scroll-handler";
import { LandingCtaSection } from "@/components/landing/landing-cta-section";
import { LandingHeroSection } from "@/components/landing/landing-hero-section";
import { LandingPlayground } from "@/components/landing/landing-playground";
import { LandingSection } from "@/components/landing/landing-section";
import { MarketingFooter } from "@/components/marketing-footer";
import { MarketingNav } from "@/components/marketing-nav";
import { bodyIntroClass, sectionHeadingClass } from "@/lib/landing-layout";

const features: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "19 switch profiles",
    description: "Holy Panda, MX Blue, Tealios, and more.",
    icon: SlidersHorizontal,
  },
  {
    title: "Spatial audio",
    description: "Each key sounds positioned on a real board.",
    icon: AudioLines,
  },
  {
    title: "Menu bar app",
    description: "One click away. Stays out of your Dock.",
    icon: PanelTop,
  },
  {
    title: "No keystroke logging",
    description: "Reads key codes only. Never sees what you type.",
    icon: ShieldCheck,
  },
];

export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <HashScrollHandler />
      <MarketingNav />

      <main className="flex flex-1 flex-col">
        <LandingHeroSection />

        <LandingSection
          id="try"
          frameClassName="overflow-visible py-10 sm:py-14 md:py-16 lg:py-20"
        >
          <LandingPlayground />
        </LandingSection>

        <LandingSection
          id="features"
          frameClassName="py-16 sm:py-20 md:py-24 lg:py-28"
        >
          <div className="mx-auto max-w-3xl text-center">
            <h2 className={sectionHeadingClass}>Built for daily typing</h2>
            <p className={`mt-5 sm:mt-6 ${bodyIntroClass}`}>
              Everything you need, nothing you don&apos;t.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-7">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
              <article
                key={feature.title}
                className="relative overflow-hidden rounded-2xl bg-card p-6 sm:p-7 ring-1 ring-foreground/10 transition-[transform,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)] hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/[0.04] dark:hover:shadow-black/25"
              >
                <Icon
                  aria-hidden
                  strokeWidth={1.25}
                  className="pointer-events-none absolute right-6 top-7 size-16 rotate-12 text-brand/15 sm:size-20 dark:text-brand/25"
                />
                <div className="relative pr-16 sm:pr-20">
                  <h3 className="font-heading text-lg font-semibold sm:text-xl">
                    {feature.title}
                  </h3>
                  <p className="mt-2.5 text-base leading-relaxed text-muted-foreground sm:mt-3">
                    {feature.description}
                  </p>
                </div>
              </article>
              );
            })}
          </div>
        </LandingSection>

        <LandingCtaSection />
      </main>

      <MarketingFooter />
    </div>
  );
}
