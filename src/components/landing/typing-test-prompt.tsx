"use client";

import { cn } from "@/lib/utils";
import type { TypingTestState } from "@/hooks/use-typing-test";

type TypingTestPromptProps = {
  state: TypingTestState;
};

export function TypingTestPrompt({ state }: TypingTestPromptProps) {
  const { phrase, index, charStates, isFinished } = state;

  return (
    <div
      className="min-h-[5.5rem] select-none font-mono text-xl leading-relaxed tracking-wide sm:min-h-[6.5rem] sm:text-2xl sm:leading-loose"
      aria-label="Typing test prompt"
    >
      {phrase.split("").map((char, i) => {
        const isCursor = i === index && !isFinished;

        return (
          <span key={`${i}-${char}`} className="relative">
            {isCursor ? (
              <span
                aria-hidden
                className="pointer-events-none absolute -left-px bottom-0 top-0 w-0.5 animate-pulse bg-brand"
              />
            ) : null}
            <span
              className={cn(
                charStates[i] === "correct" && "text-foreground",
                charStates[i] === "incorrect" && "text-destructive",
                charStates[i] === "pending" &&
                  (i < index ? "text-foreground/70" : "text-muted-foreground/45")
              )}
            >
              {char}
            </span>
          </span>
        );
      })}
      {index === phrase.length && !isFinished ? (
        <span
          aria-hidden
          className="ml-px inline-block h-[1.1em] w-0.5 animate-pulse bg-brand align-middle"
        />
      ) : null}
    </div>
  );
}
