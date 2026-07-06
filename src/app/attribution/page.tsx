import type { Metadata } from "next";

import { AttributionPage } from "@/components/attribution-page";

export const metadata: Metadata = {
  title: "Attribution — Meecanico",
  description:
    "Credits for open-source and community work used on the Meecanico marketing site.",
  openGraph: {
    title: "Attribution — Meecanico",
    description:
      "Credits for open-source and community work used on the Meecanico marketing site.",
    url: "https://getmeecanico.com/attribution",
  },
};

export default function Page() {
  return <AttributionPage />;
}
