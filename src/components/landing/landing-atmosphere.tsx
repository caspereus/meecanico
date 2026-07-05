import { cn } from "@/lib/utils";
import { landingHeroSurfaceClass } from "@/lib/landing-layout";

export function LandingAtmosphere({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div
        className={cn(
          "absolute inset-0",
          landingHeroSurfaceClass,
          "bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_48%,#fff4eb_100%)] dark:bg-[linear-gradient(180deg,#08111f_0%,#101827_52%,#16130d_100%)]"
        )}
      />
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background: `
            radial-gradient(ellipse 120% 70% at 50% -10%, rgba(59,130,246,0.18), transparent 58%),
            radial-gradient(ellipse 90% 48% at 82% 94%, rgba(232,93,4,0.14), transparent 62%),
            linear-gradient(180deg, rgba(255,255,255,0.24), rgba(255,255,255,0.72) 68%, rgba(255,255,255,0.4))
          `,
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background/80 to-transparent" />
    </div>
  );
}
