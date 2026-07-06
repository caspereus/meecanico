import type { ChangelogRelease } from "@/data/changelog";

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
    <article id={`v${release.version}`} className="scroll-mt-16">
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border/40 pb-5">
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h2 className="font-heading text-2xl font-semibold tabular-nums tracking-tight sm:text-[1.75rem]">
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
          className="shrink-0 text-xs tabular-nums text-muted-foreground sm:text-sm"
        >
          {formatReleaseDate(release.date)}
        </time>
      </header>

      <ul className="mt-6 list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground/90 sm:text-[0.9375rem]">
        {release.entries.map((entry, index) => (
          <li key={`${release.version}-${entry.category}-${index}`}>
            {entry.text}
          </li>
        ))}
      </ul>
    </article>
  );
}
