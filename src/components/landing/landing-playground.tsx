"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RotateCcw, Volume2, VolumeX } from "lucide-react";

import { ThemeSelect } from "@/components/landing/theme-select";
import {
  DEFAULT_KEYBOARD_THEME,
  KEYBOARD_THEME_OPTIONS,
  Keyboard,
  type KeyboardInteractionEvent,
  type KeyboardThemeName,
} from "@/components/ui/keyboard";
import { SwitchSelect } from "@/components/landing/switch-select";
import { TypingTestPrompt } from "@/components/landing/typing-test-prompt";
import {
  DEFAULT_SWITCH_PROFILE,
  DEMO_SWITCH_PROFILES,
  type SwitchProfile,
} from "@/data/switch-profiles";
import { useSwitchSound } from "@/hooks/use-switch-sound";
import { useTypingTest } from "@/hooks/use-typing-test";
import { cn } from "@/lib/utils";

const KEYBOARD_THEME_STORAGE_KEY = "meecanico-keyboard-theme";

function readStoredTheme(): KeyboardThemeName {
  if (typeof window === "undefined") {
    return DEFAULT_KEYBOARD_THEME;
  }

  const stored = window.localStorage.getItem(KEYBOARD_THEME_STORAGE_KEY);
  const match = KEYBOARD_THEME_OPTIONS.find((theme) => theme.id === stored);
  if (match) {
    return match.id;
  }

  return DEFAULT_KEYBOARD_THEME;
}

export function LandingPlayground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [profile, setProfile] = useState<SwitchProfile>(DEFAULT_SWITCH_PROFILE);
  const [keyboardTheme, setKeyboardTheme] =
    useState<KeyboardThemeName>(DEFAULT_KEYBOARD_THEME);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const { state, handleKeyEvent, restart } = useTypingTest();
  const { playSound } = useSwitchSound(profile, soundEnabled);

  useEffect(() => {
    setKeyboardTheme(readStoredTheme());
  }, []);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  const handleThemeChange = useCallback((theme: KeyboardThemeName) => {
    setKeyboardTheme(theme);
    window.localStorage.setItem(KEYBOARD_THEME_STORAGE_KEY, theme);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const preventSpaceScroll = (event: KeyboardEvent) => {
      if (event.code !== "Space" || event.target !== container) {
        return;
      }

      event.preventDefault();
    };

    container.addEventListener("keydown", preventSpaceScroll);
    return () => container.removeEventListener("keydown", preventSpaceScroll);
  }, []);

  const onKeyEvent = useCallback(
    (event: KeyboardInteractionEvent) => {
      if (soundEnabled) {
        if (event.phase === "down") {
          playSound("down", event.code);
        } else {
          playSound("up", event.code);
        }
      }

      handleKeyEvent(event);
    },
    [handleKeyEvent, playSound, soundEnabled]
  );

  const handleRestart = useCallback(() => {
    restart();
    containerRef.current?.focus();
  }, [restart]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className={cn(
        "mx-auto w-full max-w-[960px] rounded-2xl bg-neutral-50 px-4 py-8 outline-none sm:px-8 sm:py-10",
        "ring-1 ring-border/40 dark:bg-neutral-950/40"
      )}
    >
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <span className="text-sm text-muted-foreground">Type to hear it</span>

        <div className="flex flex-wrap items-center gap-4 sm:gap-5">
          <button
            type="button"
            onClick={() => setSoundEnabled((value) => !value)}
            className={cn(
              "inline-flex h-8 items-center gap-1.5 rounded-full border border-border/60 px-3 text-xs font-medium",
              "transition-colors hover:bg-background/80 active:scale-[0.98]"
            )}
          >
            {soundEnabled ? (
              <Volume2 className="size-3.5" />
            ) : (
              <VolumeX className="size-3.5" />
            )}
            Audio
          </button>

          <div className="flex items-center gap-4 font-mono text-sm tabular-nums text-muted-foreground">
            <span>{state.timeLeft} s</span>
            <span>{state.wpm} wpm</span>
            <span>{state.accuracy} % acc</span>
          </div>
        </div>
      </div>

      <TypingTestPrompt state={state} />

      <div className="mt-10 w-full overflow-x-auto py-2">
        <div className="mx-auto w-fit origin-top scale-[0.72] sm:scale-[0.88] md:scale-100">
          <Keyboard
            theme={keyboardTheme}
            enableHaptics={soundEnabled}
            enableSound={false}
            onKeyEvent={onKeyEvent}
          />
        </div>
      </div>

      <p className="mt-3 text-center text-[11px] text-muted-foreground">
        This keyboard + {profile.name} · Preview only — 19 profiles in the Mac app
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 sm:gap-5">
          <SwitchSelect
            profiles={DEMO_SWITCH_PROFILES}
            selected={profile}
            onSelect={setProfile}
          />
          <ThemeSelect selected={keyboardTheme} onSelect={handleThemeChange} />
        </div>

        <button
          type="button"
          onClick={handleRestart}
          className={cn(
            "inline-flex h-9 items-center gap-2 rounded-full px-3 text-sm font-medium text-muted-foreground",
            "transition-colors hover:bg-background/80 hover:text-foreground active:scale-[0.98]"
          )}
        >
          <RotateCcw className="size-4" />
          Restart
        </button>
      </div>

      {state.isFinished ? (
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Time&apos;s up — {state.wpm} wpm at {state.accuracy}% accuracy. Hit
          Restart to go again.
        </p>
      ) : null}
    </div>
  );
}
