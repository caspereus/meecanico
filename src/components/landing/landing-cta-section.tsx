import { DownloadCtaButton } from "@/components/download-cta-button";
import { LandingSection } from "@/components/landing/landing-section";
import {
  bodyIntroClass,
  sectionHeadingClass,
} from "@/lib/landing-layout";

export function LandingCtaSection() {
  return (
    <LandingSection frameClassName="py-16 text-center sm:py-20 md:py-24">
      <h2 className={sectionHeadingClass}>Ready for mechanical?</h2>
      <p className={`mx-auto mt-4 max-w-lg ${bodyIntroClass}`}>
        Free for Mac. One permission, 19 switch profiles, and mechanical sound
        in every app you type in.
      </p>
      <div className="mt-8 flex justify-center">
        <DownloadCtaButton source="cta" />
      </div>
    </LandingSection>
  );
}
