"use client";

import { useEffect, useRef } from "react";

import type { TypingTestState } from "@/hooks/use-typing-test";

type TypingLiveStatsProps = {
  state: TypingTestState;
};

export function TypingLiveStats({ state }: TypingLiveStatsProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    element.dataset.open = "false";
    void element.offsetHeight;
    element.dataset.open = "true";
  }, []);

  return (
    <div
      ref={ref}
      className="t-panel-slide t-panel-slide--compact flex flex-wrap items-center gap-2 text-xs tabular-nums text-muted-foreground sm:gap-4 sm:text-base"
      data-open="false"
    >
      <span>{state.timeLeft} s</span>
      <span>{state.wpm} wpm</span>
      <span>{state.accuracy}% acc</span>
    </div>
  );
}
