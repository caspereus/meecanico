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
import { TypingLiveStats } from "@/components/landing/typing-live-stats";
import {
  TypingTestStage,
  type TypingTestStageHandle,
} from "@/components/landing/typing-test-stage";
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
  const stageRef = useRef<TypingTestStageHandle>(null);
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
    stageRef.current?.restart();
    containerRef.current?.focus();
  }, []);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className={cn(
        "mx-auto w-full max-w-[960px] rounded-2xl bg-neutral-50 px-4 py-8 outline-none sm:px-8 sm:py-10",
        "ring-1 ring-border/40 dark:bg-neutral-950/40"
      )}
    >
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
        <span className="text-sm text-muted-foreground">Type to hear it</span>

        <div className="flex flex-wrap items-center gap-3 sm:gap-5">
          <button
            type="button"
            onClick={() => setSoundEnabled((value) => !value)}
            className={cn(
              "inline-flex h-8 items-center gap-1.5 rounded-full border border-border/60 px-3 text-xs font-medium",
              "transition-colors hover:bg-background/80 active:scale-[0.98]"
            )}
          >
            <span
              className="t-icon-swap size-3.5"
              data-state={soundEnabled ? "a" : "b"}
            >
              <Volume2 className="t-icon size-3.5" data-icon="a" />
              <VolumeX className="t-icon size-3.5" data-icon="b" />
            </span>
            Audio
          </button>

          {state.isRunning && !state.isFinished ? (
            <TypingLiveStats state={state} />
          ) : null}
        </div>
      </div>

      <TypingTestStage ref={stageRef} state={state} onRestart={restart} />

      <div className="relative mt-10 w-full">
        <div
          className={cn(
            "overflow-x-auto py-2 [-webkit-overflow-scrolling:touch]",
            "[scrollbar-width:none] sm:[scrollbar-width:thin]",
            "[&::-webkit-scrollbar]:hidden sm:[&::-webkit-scrollbar]:block"
          )}
        >
          <div className="mx-auto w-fit origin-top scale-[0.58] sm:scale-[0.72] md:scale-[0.88] lg:scale-100">
            <Keyboard
              theme={keyboardTheme}
              enableHaptics={soundEnabled}
              enableSound={false}
              visibilityRootRef={containerRef}
              onKeyEvent={onKeyEvent}
            />
          </div>
        </div>
        <p className="pointer-events-none absolute inset-x-0 -bottom-1 text-center text-[10px] text-muted-foreground/70 sm:hidden">
          Swipe to explore keyboard
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-3">
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

    </div>
  );
}
