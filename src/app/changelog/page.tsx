import type { Metadata } from "next";

import { ChangelogPage } from "@/components/changelog-page";

export const metadata: Metadata = {
  title: "Changelog — Meecanico",
  description:
    "Version history and release notes for Meecanico, the macOS menu bar app for mechanical keyboard sounds.",
  openGraph: {
    title: "Changelog — Meecanico",
    description:
      "Version history and release notes for Meecanico, the macOS menu bar app for mechanical keyboard sounds.",
    url: "https://getmeecanico.com/changelog",
  },
};

export default function Page() {
  return <ChangelogPage />;
}
