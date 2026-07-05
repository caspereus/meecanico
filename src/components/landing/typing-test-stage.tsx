"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { TypingTestPrompt } from "@/components/landing/typing-test-prompt";
import { TypingTestResults } from "@/components/landing/typing-test-results";
import type { TypingTestState } from "@/hooks/use-typing-test";
import { cn } from "@/lib/utils";

const STAGE_EXIT_MS = 200;
const STAGE_HEIGHT_CLASS = "min-h-[14rem] sm:min-h-[16rem] md:h-[16rem]";

export type TypingTestStageHandle = {
  restart: () => void;
};

type TypingTestStageProps = {
  state: TypingTestState;
  onRestart: () => void;
};

function revealPrompt(element: HTMLElement | null) {
  if (!element) {
    return;
  }

  element.classList.remove("t-panel-slide--resting");
  element.dataset.open = "false";
  void element.offsetHeight;
  element.dataset.open = "true";
}

function revealResults(element: HTMLElement | null) {
  if (!element) {
    return;
  }

  element.classList.remove("is-hiding");
  element.classList.remove("is-shown");
  void element.offsetHeight;
  element.classList.add("is-shown");
}

function hideResults(element: HTMLElement | null) {
  if (!element) {
    return;
  }

  element.classList.add("is-hiding");
  element.classList.remove("is-shown");
}

export const TypingTestStage = forwardRef<
  TypingTestStageHandle,
  TypingTestStageProps
>(function TypingTestStage({ state, onRestart }, ref) {
  const [showPrompt, setShowPrompt] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [promptHiding, setPromptHiding] = useState(false);
  const [promptResting, setPromptResting] = useState(true);
  const promptRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const wasFinishedRef = useRef(state.isFinished);
  const restartTimerRef = useRef<number | null>(null);

  const clearRestartTimer = () => {
    if (restartTimerRef.current !== null) {
      window.clearTimeout(restartTimerRef.current);
      restartTimerRef.current = null;
    }
  };

  const showPromptWithTransition = () => {
    setPromptResting(false);
    setShowPrompt(true);

    window.requestAnimationFrame(() => {
      revealPrompt(promptRef.current);
    });
  };

  useEffect(() => {
    const wasFinished = wasFinishedRef.current;

    if (!wasFinished && state.isFinished) {
      setPromptHiding(true);

      const finishTimer = window.setTimeout(() => {
        setShowPrompt(false);
        setPromptHiding(false);
        setShowResults(true);
      }, STAGE_EXIT_MS);

      wasFinishedRef.current = state.isFinished;

      return () => {
        window.clearTimeout(finishTimer);
      };
    }

    wasFinishedRef.current = state.isFinished;
  }, [state.isFinished]);

  useEffect(() => {
    if (!showResults) {
      return;
    }

    window.requestAnimationFrame(() => {
      revealResults(resultsRef.current);
    });
  }, [showResults, state.wpm, state.accuracy]);

  useImperativeHandle(
    ref,
    () => ({
      restart: () => {
        clearRestartTimer();

        const resetGame = () => {
          onRestart();
          setShowResults(false);
          setPromptHiding(false);
          showPromptWithTransition();
        };

        if (showResults) {
          hideResults(resultsRef.current);

          restartTimerRef.current = window.setTimeout(() => {
            restartTimerRef.current = null;
            resetGame();
          }, STAGE_EXIT_MS);

          return;
        }

        if (showPrompt) {
          setPromptHiding(true);

          restartTimerRef.current = window.setTimeout(() => {
            restartTimerRef.current = null;
            resetGame();
          }, STAGE_EXIT_MS);
        }
      },
    }),
    [onRestart, showPrompt, showResults]
  );

  useEffect(() => {
    return () => {
      clearRestartTimer();
    };
  }, []);

  return (
    <div className={cn("relative", STAGE_HEIGHT_CLASS)}>
      {showPrompt ? (
        <div
          className={cn("absolute inset-0", "t-stagger", promptHiding && "is-hiding")}
          aria-hidden={promptHiding}
        >
          <div
            ref={promptRef}
            className={cn(
              "t-panel-slide t-panel-slide--compact h-full",
              promptResting && "t-panel-slide--resting"
            )}
            data-open="false"
          >
            <TypingTestPrompt state={state} />
          </div>
        </div>
      ) : null}

      {showResults ? (
        <div className="absolute inset-0">
          <TypingTestResults ref={resultsRef} state={state} />
        </div>
      ) : null}
    </div>
  );
});
