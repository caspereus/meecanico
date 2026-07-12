import type { Metadata } from "next";

import { TypingFocusPage } from "@/components/typing-focus-page";

export const metadata: Metadata = {
  title: "Typing Focus — Meecanico",
  description:
    "Distraction-free typing test with mechanical keyboard sounds. 30 seconds, live WPM and accuracy.",
  openGraph: {
    title: "Typing Focus — Meecanico",
    description:
      "Distraction-free typing test with mechanical keyboard sounds. 30 seconds, live WPM and accuracy.",
    url: "https://getmeecanico.com/type",
  },
};

export default function Page() {
  return <TypingFocusPage />;
}
