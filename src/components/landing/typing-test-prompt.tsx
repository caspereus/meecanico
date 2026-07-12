"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import type { TypingTestState } from "@/hooks/use-typing-test";

type TypingTestPromptProps = {
  state: TypingTestState;
};

export function TypingTestPrompt({ state }: TypingTestPromptProps) {
  const { phrase, index, charStates } = state;
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const blockManualScroll = (event: Event) => {
      event.preventDefault();
    };

    container.addEventListener("wheel", blockManualScroll, {
      passive: false,
      capture: true,
    });
    container.addEventListener("touchmove", blockManualScroll, {
      passive: false,
      capture: true,
    });

    return () => {
      container.removeEventListener("wheel", blockManualScroll, true);
      container.removeEventListener("touchmove", blockManualScroll, true);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    let frame = 0;

    const syncScroll = () => {
      const cursor = cursorRef.current;
      if (!cursor) {
        return;
      }

      if (index === 0) {
        container.scrollTop = 0;
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const cursorRect = cursor.getBoundingClientRect();
      const cursorAbove = cursorRect.bottom < containerRect.top;
      const cursorBelow = cursorRect.top > containerRect.bottom;

      if (cursorAbove || cursorBelow) {
        cursor.scrollIntoView({ block: "nearest", inline: "nearest" });
        return;
      }

      const cursorCenter =
        cursorRect.top -
        containerRect.top +
        container.scrollTop +
        cursorRect.height / 2;
      const containerMid = container.clientHeight / 2;

      if (cursorCenter > containerMid) {
        container.scrollTop = cursorCenter - containerMid;
      }
    };

    frame = window.requestAnimationFrame(() => {
      frame = window.requestAnimationFrame(syncScroll);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [index, phrase.length]);

  return (
    <div
      ref={containerRef}
      className="h-full touch-none overflow-y-auto overscroll-none [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <div
        className="select-none break-words text-xl font-medium leading-relaxed tracking-wide sm:text-2xl sm:leading-loose md:text-3xl"
        aria-label="Typing test prompt"
      >
      {phrase.split("").map((char, i) => {
        const isCursor = i === index;

        return (
          <span
            key={i}
            ref={isCursor ? cursorRef : undefined}
            className="relative"
          >
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
          ref={cursorRef}
          aria-hidden
          className="ml-px inline-block h-[1.1em] w-0.5 animate-pulse bg-brand align-middle"
        />
      ) : null}
      </div>
    </div>
  );
}
