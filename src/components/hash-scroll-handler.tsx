"use client";

import { useEffect } from "react";

import { scrollToSection } from "@/lib/scroll-to-section";

export function HashScrollHandler() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) {
      return;
    }

    requestAnimationFrame(() => scrollToSection(hash));
  }, []);

  return null;
}
