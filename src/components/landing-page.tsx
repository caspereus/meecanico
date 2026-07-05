import { LandingHeroSection } from "@/components/landing/landing-hero-section";
import { LandingPlayground } from "@/components/landing/landing-playground";
import { LandingSection } from "@/components/landing/landing-section";
import { MarketingFooter } from "@/components/marketing-footer";
import { MarketingNav } from "@/components/marketing-nav";
import {
  bodyIntroClass,
  landingCtaSurfaceClass,
  sectionHeadingClass,
} from "@/lib/landing-layout";

const features = [
  {
    title: "19 switch profiles",
    description:
      "From Holy Panda to MX Blue — real switch names across 11 brands.",
  },
  {
    title: "3D spatial audio",
    description:
      "Each key has position on a virtual keyboard with HRTF on headphones.",
  },
  {
    title: "Menu bar control",
    description: "Always one click away. No Dock clutter.",
  },
  {
    title: "Typing visualizer",
    description:
      "Optional floating WPM/KPM HUD with themes and position.",
  },
  {
    title: "Global hotkeys",
    description: "Toggle Meecanico or cycle sound profiles instantly.",
  },
  {
    title: "Privacy by design",
    description: "Key codes only. No network, no analytics, no cloud.",
  },
];

const steps = [
  {
    step: "1",
    title: "Download & install",
    description: "Open the DMG and drag Meecanico to Applications.",
  },
  {
    step: "2",
    title: "Grant Input Monitoring",
    description:
      "Required for global key detection — we only read key codes, never typed text.",
  },
  {
    step: "3",
    title: "Pick a switch & type",
    description: "Choose a profile from the menu bar and type anywhere on your Mac.",
  },
];

export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MarketingNav />

      <main className="flex flex-1 flex-col pt-16 sm:pt-16">
        <LandingHeroSection />

        <LandingSection
          id="try"
          frameClassName="overflow-visible py-10 sm:py-14 md:py-16 lg:py-20"
        >
          <LandingPlayground />
        </LandingSection>

        <LandingSection id="features">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className={sectionHeadingClass}>How it works</h2>
            <p className={`mt-4 ${bodyIntroClass}`}>
              Three steps from download to thocky typing everywhere on macOS.
            </p>
          </div>
          <ol className="mx-auto mt-12 max-w-2xl space-y-8">
            {steps.map((item) => (
              <li key={item.step} className="flex gap-5">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border/60 text-sm font-semibold">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-heading text-base font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </LandingSection>

        <LandingSection>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className={sectionHeadingClass}>Built for Mac typists</h2>
            <p className={`mt-4 ${bodyIntroClass}`}>
              Native Swift, menu bar utility — not another Electron toy.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-xl bg-card p-5 ring-1 ring-foreground/10"
              >
                <h3 className="font-heading text-base font-semibold">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </LandingSection>

        <LandingSection id="privacy">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className={sectionHeadingClass}>Hears keys, not words</h2>
            <p className={`mt-4 ${bodyIntroClass}`}>
              Meecanico only reads virtual key codes to play sounds. It never
              captures, stores, or transmits typed text.
            </p>
            <ul className="mt-8 space-y-3 text-left text-sm leading-relaxed text-muted-foreground">
              <li>• Listens to virtual key codes from key-down events only</li>
              <li>• Never reads characters, clipboard, or passwords</li>
              <li>• No network requests from the app</li>
              <li>• No analytics or telemetry</li>
              <li>• Settings stay in local UserDefaults</li>
            </ul>
          </div>
        </LandingSection>

        <LandingSection
          id="switches"
          className={landingCtaSurfaceClass}
          frameClassName="py-16 sm:py-20 md:py-24"
        >
          <div className="mx-auto max-w-2xl text-center">
            <h2 className={sectionHeadingClass}>19 switches. One menu bar icon.</h2>
            <p className={`mt-4 ${bodyIntroClass}`}>
              Cherry, Kailh, Topre, Holy Panda, and more — grouped by brand in
              the switch picker.
            </p>
          </div>
        </LandingSection>
      </main>

      <MarketingFooter />
    </div>
  );
}
