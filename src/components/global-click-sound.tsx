"use client";

import { useEffect } from "react";

import { DEFAULT_SWITCH_PROFILE } from "@/data/switch-profiles";
import { useSwitchSound } from "@/hooks/use-switch-sound";

const CLICK_SOUND_KEY = "Enter";

function shouldPlayClickSound(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return false;
  }

  return !target.closest("[data-keyboard-root]");
}

export function GlobalClickSound() {
  const { playSound } = useSwitchSound(DEFAULT_SWITCH_PROFILE);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (event.button !== 0 || !shouldPlayClickSound(event.target)) {
        return;
      }

      playSound("down", CLICK_SOUND_KEY);
    };

    const handleMouseUp = (event: MouseEvent) => {
      if (event.button !== 0 || !shouldPlayClickSound(event.target)) {
        return;
      }

      playSound("up", CLICK_SOUND_KEY);
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [playSound]);

  return null;
}
