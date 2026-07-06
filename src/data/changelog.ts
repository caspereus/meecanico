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
        text: "Mechanical keyboard sounds in any Mac app.",
      },
      {
        category: "added",
        text: "19 switch profiles with preview.",
      },
      {
        category: "added",
        text: "3D spatial audio per key.",
      },
      {
        category: "added",
        text: "Menu bar controls for profiles, volume, and mute.",
      },
      {
        category: "added",
        text: "Optional WPM/KPM visualizer.",
      },
      {
        category: "added",
        text: "Global hotkeys to toggle and switch profiles.",
      },
      {
        category: "added",
        text: "No keystroke logging, network, or analytics.",
      },
      {
        category: "added",
        text: "Guided Input Monitoring setup.",
      },
    ],
  },
];
