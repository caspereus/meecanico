"use client";

import { useEffect } from "react";

import type { KeyboardInteractionEvent } from "@/components/ui/keyboard";

export function usePhysicalKeyboard(
  onKeyEvent: (event: KeyboardInteractionEvent) => void,
  enabled = true
) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) {
        return;
      }

      if (event.code === "Space") {
        event.preventDefault();
      }

      onKeyEvent({ code: event.code, phase: "down", source: "physical" });
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      onKeyEvent({ code: event.code, phase: "up", source: "physical" });
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [enabled, onKeyEvent]);
}
