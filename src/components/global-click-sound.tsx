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
    const handlePointerDown = (event: PointerEvent) => {
      if (event.button !== 0 || !shouldPlayClickSound(event.target)) {
        return;
      }

      playSound("down", CLICK_SOUND_KEY);
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (event.button !== 0 || !shouldPlayClickSound(event.target)) {
        return;
      }

      playSound("up", CLICK_SOUND_KEY);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("pointerup", handlePointerUp);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointerup", handlePointerUp);
    };
  }, [playSound]);

  return null;
}
