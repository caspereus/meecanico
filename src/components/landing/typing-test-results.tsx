"use client";

import { forwardRef } from "react";

import { AnimatedDigits } from "@/components/ui/animated-digits";
import type { TypingTestState } from "@/hooks/use-typing-test";

type TypingTestResultsProps = {
  state: TypingTestState;
};

export const TypingTestResults = forwardRef<HTMLDivElement, TypingTestResultsProps>(
  function TypingTestResults({ state }, ref) {
    return (
      <div
        ref={ref}
        className="t-stagger flex h-full flex-col items-center justify-center gap-3"
        aria-live="polite"
        aria-label="Typing test results"
      >
        <p className="t-stagger-line t-stagger-line--1 text-5xl font-semibold tabular-nums tracking-tight sm:text-6xl">
          <AnimatedDigits value={String(state.wpm)} /> wpm
        </p>
        <p className="t-stagger-line t-stagger-line--2 text-3xl font-medium tabular-nums text-foreground/80 sm:text-4xl">
          <AnimatedDigits value={String(state.accuracy)} />% accuracy
        </p>
      </div>
    );
  }
);
