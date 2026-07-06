import { AttributionHeroSection } from "@/components/attribution/attribution-hero-section";
import { LandingSection } from "@/components/landing/landing-section";
import { MarketingFooter } from "@/components/marketing-footer";
import { MarketingNav } from "@/components/marketing-nav";
import { bodyIntroClass, sectionHeadingClass } from "@/lib/landing-layout";

const attributionEntries = [
  {
    title: "Keyboard UI",
    creator: "Himanshu Malviya",
    href: "https://himan.me/",
    description:
      "A Keychron K2–inspired interactive keyboard component with optional haptics and mechanical sound effects.",
    usage:
      "The typing playground on the Meecanico landing page uses an adapted version of this component, extended with custom themes and switch-sound integration.",
  },
] as const;

export function AttributionPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MarketingNav />

      <main className="flex flex-1 flex-col">
        <AttributionHeroSection />

        <LandingSection frameClassName="py-10 sm:py-14 md:py-16 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <p className={bodyIntroClass}>
              Meecanico is built with care for the Mac and keyboard community.
              Where we stand on the shoulders of others, we want to say thank
              you.
            </p>

            <ul className="mt-10 space-y-8 sm:mt-12 sm:space-y-10">
              {attributionEntries.map((entry) => (
                <li
                  key={entry.title}
                  className="rounded-2xl border border-border/50 bg-gradient-to-b from-muted/30 to-transparent p-6 sm:p-8"
                >
                  <h2 className={sectionHeadingClass}>{entry.title}</h2>
                  <p className={`mt-4 ${bodyIntroClass}`}>{entry.description}</p>
                  <p className={`mt-3 ${bodyIntroClass}`}>{entry.usage}</p>
                  <p className="mt-5 text-sm text-muted-foreground">
                    Created by{" "}
                    <a
                      href={entry.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-link transition-colors hover:text-foreground"
                    >
                      {entry.creator}
                    </a>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </LandingSection>
      </main>

      <MarketingFooter />
    </div>
  );
}
