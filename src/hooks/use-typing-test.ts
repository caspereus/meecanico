"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { KeyboardInteractionEvent } from "@/components/ui/keyboard";
import {
  calculateAccuracy,
  calculateWpm,
  codeToChar,
  DEFAULT_TYPING_PHRASE,
  randomTypingPhrase,
  TYPING_TEST_DURATION_SEC,
  type CharState,
} from "@/lib/typing-test";

export type TypingTestState = {
  phrase: string;
  index: number;
  charStates: CharState[];
  correctChars: number;
  incorrectChars: number;
  wpm: number;
  accuracy: number;
  timeLeft: number;
  isRunning: boolean;
  isFinished: boolean;
};

function createInitialState(phrase: string): TypingTestState {
  return {
    phrase,
    index: 0,
    charStates: phrase.split("").map(() => "pending" as CharState),
    correctChars: 0,
    incorrectChars: 0,
    wpm: 0,
    accuracy: 100,
    timeLeft: TYPING_TEST_DURATION_SEC,
    isRunning: false,
    isFinished: false,
  };
}

export function useTypingTest() {
  const [state, setState] = useState<TypingTestState>(() =>
    createInitialState(DEFAULT_TYPING_PHRASE)
  );
  const shiftRef = useRef(false);
  const startTimeRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const finishTest = useCallback(() => {
    clearTimer();
    setState((current) => ({ ...current, isFinished: true, isRunning: false }));
  }, [clearTimer]);

  const updateLiveStats = useCallback(() => {
    const startTime = startTimeRef.current;
    if (!startTime) {
      return;
    }

    const elapsedMs = Date.now() - startTime;

    setState((current) => ({
      ...current,
      wpm: calculateWpm(current.correctChars, elapsedMs),
      accuracy: calculateAccuracy(current.correctChars, current.incorrectChars),
    }));
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) {
      return;
    }

    startTimeRef.current = Date.now();

    timerRef.current = setInterval(() => {
      setState((current) => {
        if (current.isFinished) {
          return current;
        }

        const nextTimeLeft = current.timeLeft - 1;

        if (nextTimeLeft <= 0) {
          clearTimer();
          return {
            ...current,
            timeLeft: 0,
            isFinished: true,
            isRunning: false,
          };
        }

        return {
          ...current,
          timeLeft: nextTimeLeft,
          isRunning: true,
        };
      });

      updateLiveStats();
    }, 1000);
  }, [clearTimer, updateLiveStats]);

  const handleKeyEvent = useCallback(
    (event: KeyboardInteractionEvent) => {
      if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
        shiftRef.current = event.phase === "down";
        return;
      }

      if (event.phase !== "down") {
        return;
      }

      setState((current) => {
        if (current.isFinished) {
          return current;
        }

        if (event.code === "Backspace") {
          if (current.index === 0) {
            return current;
          }

          const prevIndex = current.index - 1;
          const charStates = [...current.charStates];
          const wasIncorrect = charStates[prevIndex] === "incorrect";
          const wasCorrect = charStates[prevIndex] === "correct";

          charStates[prevIndex] = "pending";

          return {
            ...current,
            index: prevIndex,
            charStates,
            correctChars: wasCorrect
              ? current.correctChars - 1
              : current.correctChars,
            incorrectChars: wasIncorrect
              ? current.incorrectChars - 1
              : current.incorrectChars,
            accuracy: calculateAccuracy(
              wasCorrect ? current.correctChars - 1 : current.correctChars,
              wasIncorrect
                ? current.incorrectChars - 1
                : current.incorrectChars
            ),
          };
        }

        const typed = codeToChar(event.code, shiftRef.current);
        if (!typed) {
          return current;
        }

        if (!current.isRunning) {
          startTimer();
        }

        const expected = current.phrase[current.index];
        if (expected === undefined) {
          return current;
        }

        const isCorrect = typed === expected;
        const charStates = [...current.charStates];
        charStates[current.index] = isCorrect ? "correct" : "incorrect";

        const correctChars = current.correctChars + (isCorrect ? 1 : 0);
        const incorrectChars = current.incorrectChars + (isCorrect ? 0 : 1);
        const index = current.index + 1;
        const elapsedMs = startTimeRef.current
          ? Date.now() - startTimeRef.current
          : 0;

        const nextState: TypingTestState = {
          ...current,
          index,
          charStates,
          correctChars,
          incorrectChars,
          isRunning: true,
          wpm: calculateWpm(correctChars, elapsedMs),
          accuracy: calculateAccuracy(correctChars, incorrectChars),
        };

        if (index >= current.phrase.length) {
          const newPhrase = randomTypingPhrase();
          const elapsedMs = startTimeRef.current
            ? Date.now() - startTimeRef.current
            : 0;

          return {
            ...current,
            phrase: newPhrase,
            index: 0,
            charStates: newPhrase.split("").map(() => "pending" as CharState),
            correctChars,
            incorrectChars,
            wpm: calculateWpm(correctChars, elapsedMs),
            accuracy: calculateAccuracy(correctChars, incorrectChars),
            isRunning: true,
          };
        }

        return nextState;
      });
    },
    [startTimer]
  );

  const restart = useCallback(() => {
    clearTimer();
    startTimeRef.current = null;
    shiftRef.current = false;
    setState(createInitialState(randomTypingPhrase()));
  }, [clearTimer]);

  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  return { state, handleKeyEvent, restart, finishTest };
}
