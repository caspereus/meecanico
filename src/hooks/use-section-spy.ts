"use client";

import { useEffect, useState } from "react";

function getSectionTop(element: HTMLElement) {
  return element.getBoundingClientRect().top + window.scrollY;
}

export function useSectionSpy(sectionIds: readonly string[], offset = 80) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => {
        const element = document.getElementById(id);
        return element ? { id, element } : null;
      })
      .filter(
        (section): section is { id: string; element: HTMLElement } =>
          section !== null
      );

    if (sections.length === 0) {
      return;
    }

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + offset;
      const nearBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2;

      if (nearBottom) {
        setActiveId(sections[sections.length - 1].id);
        return;
      }

      let nextActive: string | null = null;

      for (const section of sections) {
        if (scrollPosition >= getSectionTop(section.element)) {
          nextActive = section.id;
        }
      }

      setActiveId(nextActive);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [sectionIds, offset]);

  return activeId;
}
