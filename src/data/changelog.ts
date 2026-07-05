export type ChangelogCategory = "added" | "changed" | "fixed" | "removed";

export type ChangelogEntry = {
  category: ChangelogCategory;
  text: string;
};

export type ChangelogRelease = {
  version: string;
  date: string;
  title?: string;
  entries: ChangelogEntry[];
};

export const changelogCategoryLabels: Record<ChangelogCategory, string> = {
  added: "Added",
  changed: "Changed",
  fixed: "Fixed",
  removed: "Removed",
};

export const changelogReleases: ChangelogRelease[] = [
  {
    version: "1.0.0",
    date: "2026-07-01",
    title: "Initial release",
    entries: [
      {
        category: "added",
        text: "Global mechanical keyboard sounds across every macOS app.",
      },
      {
        category: "added",
        text: "19 switch profiles across 11 brands, with in-menu audio preview.",
      },
      {
        category: "added",
        text: "3D spatial audio with per-key positioning on a virtual keyboard.",
      },
      {
        category: "added",
        text: "Menu bar app with profile picker, volume control, and quick mute.",
      },
      {
        category: "added",
        text: "Optional floating WPM/KPM typing visualizer with themes.",
      },
      {
        category: "added",
        text: "Global hotkeys to toggle Meecanico and cycle sound profiles.",
      },
      {
        category: "added",
        text: "Privacy-first architecture — key codes only, no network, no analytics.",
      },
      {
        category: "added",
        text: "Input Monitoring onboarding flow with clear permission guidance.",
      },
    ],
  },
];
