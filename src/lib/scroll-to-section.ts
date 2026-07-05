import { marketingNavScrollOffset } from "@/lib/marketing-nav-layout";

export function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (!element) {
    return;
  }

  const top =
    element.getBoundingClientRect().top +
    window.scrollY -
    marketingNavScrollOffset;

  window.scrollTo({ top, behavior: "smooth" });
}
