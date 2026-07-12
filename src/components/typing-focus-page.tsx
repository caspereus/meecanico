"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, RotateCcw, Volume2, VolumeX } from "lucide-react";

import { BrandLogo } from "@/components/brand-logo";
import { SwitchSelect } from "@/components/landing/switch-select";
import { TypingLiveStats } from "@/components/landing/typing-live-stats";
import {
  TypingTestStage,
  type TypingTestStageHandle,
} from "@/components/landing/typing-test-stage";
import type { KeyboardInteractionEvent } from "@/components/ui/keyboard";
import {
  DEFAULT_SWITCH_PROFILE,
  DEMO_SWITCH_PROFILES,
  type SwitchProfile,
} from "@/data/switch-profiles";
import { usePhysicalKeyboard } from "@/hooks/use-physical-keyboard";
import { useSwitchSound } from "@/hooks/use-switch-sound";
import { useTypingTest } from "@/hooks/use-typing-test";
import { cn } from "@/lib/utils";

export function TypingFocusPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<TypingTestStageHandle>(null);
  const [profile, setProfile] = useState<SwitchProfile>(DEFAULT_SWITCH_PROFILE);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const { state, handleKeyEvent, restart } = useTypingTest();
  const { playSound } = useSwitchSound(profile, soundEnabled);

  useEffect(() => {
    containerRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented) {
        return;
      }

      router.push("/");
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [router]);

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

  usePhysicalKeyboard(onKeyEvent);

  const handleRestart = useCallback(() => {
    stageRef.current?.restart();
    containerRef.current?.focus({ preventScroll: true });
  }, []);

  const showLiveStats = state.isRunning && !state.isFinished;
  const showIdleHint = !state.isRunning && !state.isFinished;

  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      className="flex min-h-screen flex-col bg-background outline-none"
    >
      <header className="fixed inset-x-0 top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6">
          <Link
            href="/"
            className={cn(
              "inline-flex min-w-0 items-center gap-2 text-sm font-medium text-muted-foreground",
              "transition-colors hover:text-foreground"
            )}
          >
            <ArrowLeft className="size-4 shrink-0" aria-hidden />
            <BrandLogo showWordmark={false} />
            <span className="truncate">Meecanico</span>
          </Link>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {showLiveStats ? (
              <TypingLiveStats state={state} />
            ) : null}

            <button
              type="button"
              onClick={() => setSoundEnabled((value) => !value)}
              aria-pressed={soundEnabled}
              className={cn(
                "inline-flex h-8 items-center gap-1.5 rounded-full border border-border/60 px-3 text-xs font-medium",
                "transition-colors hover:bg-muted/50 active:scale-[0.98]"
              )}
            >
              <span
                className="t-icon-swap size-3.5"
                data-state={soundEnabled ? "a" : "b"}
              >
                <Volume2 className="t-icon size-3.5" data-icon="a" />
                <VolumeX className="t-icon size-3.5" data-icon="b" />
              </span>
              <span className="hidden sm:inline">Audio</span>
            </button>

            <div className="hidden sm:block">
              <SwitchSelect
                profiles={DEMO_SWITCH_PROFILES}
                selected={profile}
                onSelect={setProfile}
              />
            </div>

            <button
              type="button"
              onClick={handleRestart}
              className={cn(
                "inline-flex h-8 items-center gap-1.5 rounded-full border border-border/60 px-3 text-xs font-medium",
                "transition-colors hover:bg-muted/50 active:scale-[0.98]"
              )}
            >
              <RotateCcw className="size-3.5" />
              <span className="hidden sm:inline">Restart</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4 pb-12 pt-20 sm:px-6 sm:pt-24">
        <div className="w-full max-w-4xl">
          {showIdleHint ? (
            <p className="mb-6 text-center text-sm text-muted-foreground">
              Start typing to begin the 30-second test
            </p>
          ) : null}

          <div className="mb-6 flex justify-center sm:hidden">
            <SwitchSelect
              profiles={DEMO_SWITCH_PROFILES}
              selected={profile}
              onSelect={setProfile}
            />
          </div>

          <TypingTestStage ref={stageRef} state={state} onRestart={restart} />
        </div>
      </main>

      <footer className="pointer-events-none fixed inset-x-0 bottom-0 pb-4 text-center">
        <p className="text-xs text-muted-foreground/70">
          Press <kbd className="rounded border border-border/60 px-1.5 py-0.5 font-mono">Esc</kbd>{" "}
          to exit focus mode
        </p>
      </footer>
    </div>
  );
}
