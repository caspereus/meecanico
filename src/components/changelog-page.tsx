import { ChangelogHeroSection } from "@/components/changelog/changelog-hero-section";
import { ChangelogReleaseCard } from "@/components/changelog/changelog-release";
import { DownloadCtaButton } from "@/components/download-cta-button";
import { LandingSection } from "@/components/landing/landing-section";
import { MarketingFooter } from "@/components/marketing-footer";
import { MarketingNav } from "@/components/marketing-nav";
import { changelogReleases } from "@/data/changelog";
import { bodyIntroClass } from "@/lib/landing-layout";
import { cn } from "@/lib/utils";

function formatReleaseDate(isoDate: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

export function ChangelogPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MarketingNav />

      <main className="flex flex-1 flex-col">
        <ChangelogHeroSection />

        <LandingSection frameClassName="py-10 sm:py-14 md:py-16 lg:py-20">
          <nav
            className="mb-8 lg:hidden"
            aria-label="Release versions"
          >
            <div
              className={cn(
                "flex gap-2 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]",
                "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              )}
            >
              {changelogReleases.map((release, index) => (
                <a
                  key={release.version}
                  href={`#v${release.version}`}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm tabular-nums transition-colors duration-[var(--duration-quick)]",
                    index === 0
                      ? "border-primary/30 bg-primary/10 font-semibold text-primary"
                      : "border-border/60 text-muted-foreground hover:border-border hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  v{release.version}
                  {index === 0 ? (
                    <span className="size-1.5 rounded-full bg-primary shadow-[0_0_6px_1px] shadow-primary/40" />
                  ) : null}
                </a>
              ))}
            </div>
          </nav>

          <div className="mx-auto max-w-3xl lg:grid lg:max-w-none lg:grid-cols-[11rem_minmax(0,42rem)] lg:justify-center lg:gap-x-14 xl:grid-cols-[12rem_minmax(0,42rem)] xl:gap-x-16">
            <aside className="mb-10 hidden lg:block" aria-label="Release versions">
              <nav className="sticky top-24">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Versions
                </p>
                <ol className="mt-4 space-y-1">
                  {changelogReleases.map((release, index) => (
                    <li key={release.version}>
                      <a
                        href={`#v${release.version}`}
                        className={cn(
                          "group flex items-center justify-between rounded-lg px-2.5 py-2 text-sm tabular-nums transition-colors duration-[var(--duration-quick)]",
                          index === 0
                            ? "bg-primary/10 font-semibold text-primary"
                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                        )}
                      >
                        <span>v{release.version}</span>
                        {index === 0 ? (
                          <span className="size-1.5 rounded-full bg-primary shadow-[0_0_6px_1px] shadow-primary/40" />
                        ) : null}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            <div>
              <ol className="space-y-8 sm:space-y-10">
                {changelogReleases.map((release, index) => (
                  <li key={release.version}>
                    <ChangelogReleaseCard
                      release={release}
                      isLatest={index === 0}
                      formatReleaseDate={formatReleaseDate}
                    />
                  </li>
                ))}
              </ol>

              <div className="mt-16 rounded-2xl border border-border/50 bg-gradient-to-b from-muted/30 to-transparent p-8 text-center sm:p-10">
                <p className="font-heading text-lg font-semibold tracking-tight sm:text-xl">
                  Stay on the latest build
                </p>
                <p className={`mx-auto mt-2 max-w-sm ${bodyIntroClass}`}>
                  Download Meecanico for the newest switch profiles and fixes.
                </p>
                <div className="mt-6 flex justify-center">
                  <DownloadCtaButton />
                </div>
              </div>
            </div>
          </div>
        </LandingSection>
      </main>

      <MarketingFooter />
    </div>
  );
}
