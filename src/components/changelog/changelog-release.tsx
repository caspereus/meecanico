import {
  changelogCategoryLabels,
  type ChangelogCategory,
  type ChangelogRelease,
} from "@/data/changelog";
import { cn } from "@/lib/utils";

const categoryDotClass: Record<ChangelogCategory, string> = {
  added: "bg-primary shadow-[0_0_6px_1px] shadow-primary/40",
  changed: "bg-amber-500 shadow-[0_0_6px_1px] shadow-amber-500/30",
  fixed: "bg-muted-foreground/50",
  removed: "bg-destructive/80 shadow-[0_0_6px_1px] shadow-destructive/30",
};

type ChangelogReleaseCardProps = {
  release: ChangelogRelease;
  isLatest?: boolean;
  formatReleaseDate: (isoDate: string) => string;
};

export function ChangelogReleaseCard({
  release,
  isLatest = false,
  formatReleaseDate,
}: ChangelogReleaseCardProps) {
  return (
    <article
      id={`v${release.version}`}
      className={cn(
        "group relative scroll-mt-16 overflow-hidden rounded-2xl border bg-card/70 backdrop-blur-sm transition-[transform,box-shadow,border-color] duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)]",
        isLatest
          ? "border-primary/25 shadow-lg shadow-primary/[0.06] ring-1 ring-primary/15 hover:border-primary/35 hover:shadow-xl hover:shadow-primary/[0.08]"
          : "border-border/50 shadow-sm shadow-black/[0.02] ring-1 ring-foreground/[0.04] hover:-translate-y-0.5 hover:border-border/70 hover:shadow-md hover:shadow-black/[0.04] dark:shadow-black/20 dark:hover:shadow-black/30"
      )}
    >
      {isLatest ? (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 -top-24 size-48 rounded-full bg-primary/10 blur-3xl"
          />
        </>
      ) : null}

      <div className="relative p-6 sm:p-8">
        <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border/40 pb-5">
          <div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h2 className="font-mono text-2xl font-semibold tabular-nums tracking-tight sm:text-[1.75rem]">
                v{release.version}
              </h2>
              {isLatest ? (
                <span className="inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                  Latest
                </span>
              ) : null}
            </div>
            {release.title ? (
              <p className="mt-1.5 font-heading text-base font-medium text-foreground/90 sm:text-lg">
                {release.title}
              </p>
            ) : null}
          </div>

          <time
            dateTime={release.date}
            className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground sm:text-sm"
          >
            {formatReleaseDate(release.date)}
          </time>
        </header>

        <ul className="mt-6 space-y-3.5">
          {release.entries.map((entry, index) => (
            <li
              key={`${release.version}-${entry.category}-${index}`}
              className="flex gap-4 rounded-xl px-1 py-1.5 transition-colors duration-[var(--duration-quick)] hover:bg-muted/40"
            >
              <span
                className={cn(
                  "mt-[0.55rem] size-1.5 shrink-0 rounded-full",
                  categoryDotClass[entry.category]
                )}
                aria-hidden
              />
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {changelogCategoryLabels[entry.category]}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-foreground/90 sm:text-[0.9375rem]">
                  {entry.text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
