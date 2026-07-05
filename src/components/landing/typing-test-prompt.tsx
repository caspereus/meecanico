"use client";

import { cn } from "@/lib/utils";
import type { TypingTestState } from "@/hooks/use-typing-test";

type TypingTestPromptProps = {
  state: TypingTestState;
};

export function TypingTestPrompt({ state }: TypingTestPromptProps) {
  const { phrase, index, charStates } = state;

  return (
    <div
      className="select-none break-words text-xl font-medium leading-relaxed tracking-wide sm:text-2xl sm:leading-loose md:text-3xl"
      aria-label="Typing test prompt"
    >
      {phrase.split("").map((char, i) => {
        const isCursor = i === index;

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
                  (i < index ? "text-foreground/85" : "text-muted-foreground/70")
              )}
            >
              {char}
            </span>
          </span>
        );
      })}
      {index === phrase.length ? (
        <span
          aria-hidden
          className="ml-px inline-block h-[1.1em] w-0.5 animate-pulse bg-brand align-middle"
        />
      ) : null}
    </div>
  );
}
